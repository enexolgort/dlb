import * as fs from "fs";

type Token = string;
type Value = number | boolean | string | Value[];

const CUSTOM_OPERATORS: Record<string, string> = {
  ajoute: "+",
  enleve: "-",
  multipli: "*",
  divise: "/",
  modulo: "%",

  et: "AND",
  ou: "OR",
  non: "NOT",

  egale: "=",
  different: "!=",

  plugran: ">",
  plupti: "<",

  preskplugran: ">=",
  preskplupti: "<=",

  vrai: "true",
  faux: "false",
};

function normalizeExpression(input: string): string {
  return input
    .split(/\s+/)
    .map((token) => CUSTOM_OPERATORS[token] ?? token)
    .join(" ");
}

const PRECEDENCE: Record<string, number> = {
  OR: 1,
  AND: 2,

  "=": 3,
  "!=": 3,
  "<": 3,
  ">": 3,
  "<=": 3,
  ">=": 3,

  "+": 4,
  "-": 4,

  "*": 5,
  "/": 5,

  NOT: 6,
  premier: 6,
  dernier: 6,
  taille: 6,
  car: 6,
  de: 7,
};

const RIGHT_ASSOCIATIVE = new Set([
  "NOT",
  "premier",
  "dernier",
  "taille",
  "car",
  "de",
]);

function normalizeToken(token: string): string {
  return CUSTOM_OPERATORS[token] ?? token;
}

function evaluatePrefix(expression: string, mem: Record<string, Value>): Value {
  const tokens = tokenize(expression.trim()).map(normalizeToken).reverse();

  function evalRecursive(): Value {
    const token = tokens.pop();

    if (!token) {
      throw new Error("Unexpected end of expression");
    }

    // Number
    if (/^-?\d+(\.\d+)?$/.test(token)) {
      return Number(token);
    }

    // Boolean
    if (token === "true") return true;
    if (token === "false") return false;

    // String literal
    if (/^'.*'$/.test(token) || /^".*"$/.test(token)) {
      return token.slice(1, -1);
    }

    // List literal
    if (token === "[") {
      const items: Value[] = [];
      while (tokens[tokens.length - 1] !== "]") {
        const next = tokens[tokens.length - 1];
        if (next === ",") {
          tokens.pop();
          continue;
        }
        items.push(evalRecursive());
      }
      tokens.pop(); // consume "]"
      return items;
    }

    if (token === "NOT") {
      return !Boolean(evalRecursive());
    }

    if (token === "premier") {
      const list = evalRecursive() as Value[];
      if (!Array.isArray(list)) throw new Error(`"premier" expects a list`);
      return list[0];
    }

    if (token === "dernier") {
      const list = evalRecursive() as Value[];
      if (!Array.isArray(list)) throw new Error(`"dernier" expects a list`);
      return list[list.length - 1];
    }

    if (token === "taille") {
      const list = evalRecursive() as Value[];
      if (!Array.isArray(list)) throw new Error(`"taille" expects a list`);
      return list.length;
    }

    if (token === "car") {
      const code = evalRecursive() as number;
      if (typeof code !== "number") throw new Error(`"car" expects a number`);
      return String.fromCharCode(code);
    }

    if (token === "de") {
      const list = evalRecursive() as Value[];
      const index = evalRecursive() as number;
      if (!Array.isArray(list)) throw new Error(`"a" expects a list`);
      if (index < 0 || index >= list.length)
        throw new Error(
          `Index ${index} out of bounds (list length: ${list.length}) at ip=${mem.ip ?? "?"}`,
        );
      return list[index];
    }

    // Binary operators
    if (
      [
        "+",
        "-",
        "*",
        "/",
        "%",
        "AND",
        "OR",
        "=",
        "!=",
        ">",
        "<",
        ">=",
        "<=",
      ].includes(token)
    ) {
      const left = evalRecursive();
      const right = evalRecursive();

      switch (token) {
        case "+":
          return Number(left) + Number(right);
        case "-":
          return Number(left) - Number(right);
        case "*":
          return Number(left) * Number(right);
        case "/":
          return Number(left) / Number(right);
        case "%":
          return Number(left) % Number(right);
        case "AND":
          return Boolean(left) && Boolean(right);
        case "OR":
          return Boolean(left) || Boolean(right);
        case "=":
          return left === right;
        case "!=":
          return left !== right;
        case ">":
          return Number(left) > Number(right);
        case "<":
          return Number(left) < Number(right);
        case ">=":
          return Number(left) >= Number(right);
        case "<=":
          return Number(left) <= Number(right);
      }
    }

    const value = mem[token];
    if (value !== undefined) {
      return value;
    }

    throw new Error(`Unknown token: ${token}`);
  }

  return evalRecursive();
}

function tokenize(input: string): Token[] {
  const regex =
    /\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|>=|<=|!=|AND|OR|NOT|premier|dernier|taille|car|[\[\]()+\-*\/<>=,]|[A-Za-z_][A-Za-z0-9_]*|\d+)\s*/g;

  return [...input.matchAll(regex)]
    .map((m) => m[1])
    .filter((t): t is string => t !== undefined);
}

function isOperator(token: string): boolean {
  return token in PRECEDENCE;
}

function infixToPrefix(expression: string): string {
  const normalized = normalizeExpression(expression);
  const tokens = tokenize(normalized);
  const reversed = tokens.reverse().map((t) => {
    if (t === "(") return ")";
    if (t === ")") return "(";
    return t;
  });
  const operators: string[] = [];
  const output: string[] = [];
  for (const token of reversed) {
    if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length > 0 && operators[operators.length - 1] !== "(") {
        output.push(operators.pop()!);
      }
      operators.pop();
    } else if (isOperator(token)) {
      while (operators.length > 0) {
        const top = operators[operators.length - 1];
        if (!top || !isOperator(top)) break;
        const topPrecedence = PRECEDENCE[top];
        const tokenPrecedence = PRECEDENCE[token];
        if (topPrecedence === undefined || tokenPrecedence === undefined) break;
        if (
          topPrecedence > tokenPrecedence ||
          (topPrecedence === tokenPrecedence && !RIGHT_ASSOCIATIVE.has(token))
        ) {
          output.push(operators.pop()!);
        } else {
          break;
        }
      }
      operators.push(token);
    } else if (token === ",") {
      continue;
    } else {
      output.push(token);
    }
  }
  while (operators.length > 0) {
    output.push(operators.pop()!);
  }
  return output.reverse().join(" ");
}

function getList(mem: Record<string, Value>, name: string): Value[] {
  if (!Array.isArray(mem[name])) throw new Error(`"${name}" is not a list`);
  return mem[name] as Value[];
}

function resolveTarget(
  target: string,
  labels: Record<string, number>,
  mem: Record<string, Value>,
): number {
  if (labels[target] !== undefined) return labels[target];
  return Number(evaluatePrefix(infixToPrefix(target), mem));
}

let mem: any = { lineIndex: 0 };

function main() {
  const file = fs.readFileSync("./script.dlb", {
    flag: "r",
    encoding: "utf-8",
  });
  const lines = file.split(/\r?\n/);

  // First pass: collect labels
  const labels: Record<string, number> = {};
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^#(\w+)/);
    if (match) labels[match[1]] = i;
  }

  while (mem.lineIndex < lines.length) {
    const line: string = lines[mem.lineIndex];
    if (line == undefined) break;
    if (line.match(/jai\s+(\w+)\s*=\s*programme\s*'(.+)';/)) {
      const [, name, code] =
        line.match(/jai\s+(\w+)\s*=\s*programme\s*'(.+)';/) ?? [];
      mem[name] = code.split("") as Value[];
      mem.lineIndex += 1;
    } else if (line.match(/jai\s+(\w+)\s+de\s+(.+)\s*=\s*(.+);/)) {
      const [, listName, indexExpr, valueExpr] =
        line.match(/jai\s+(\w+)\s+de\s+(.+)\s*=\s*(.+);/) ?? [];
      const index = Number(evaluatePrefix(infixToPrefix(indexExpr), mem));
      const value = evaluatePrefix(infixToPrefix(valueExpr), mem);
      getList(mem, listName)[index] = value;
      mem.lineIndex += 1;
    } else if (line.match(/jai\s+\w+\s*=\s*.+;/)) {
      const name = line.match(/jai\s+([a-zA-Z0-9_]+)\s*=/)?.[1] ?? "";
      const expr = infixToPrefix(line.match(/=\s*(.+);/)?.[1] ?? "");
      mem[name] = evaluatePrefix(expr, mem);
      mem.lineIndex += 1;
    } else if (line.startsWith("verifi ")) {
      const vaIndex = line.lastIndexOf(" va ");
      const condition = line.slice("verifi ".length, vaIndex);
      const target = line.slice(vaIndex + 4, -1); // strip trailing ;
      if (evaluatePrefix(infixToPrefix(condition), mem))
        mem.lineIndex = resolveTarget(target, labels, mem);
      else mem.lineIndex += 1;
    } else if (line.startsWith("va ")) {
      const target = line.slice("va ".length, -1); // strip trailing ;
      mem.lineIndex = resolveTarget(target, labels, mem);
    } else if (line.match(/affich\s+(.+);/)) {
      const [, expr] = line.match(/affich\s+(.+);/) ?? [];
      const val = evaluatePrefix(infixToPrefix(expr), mem);
      console.log(val);
      mem.lineIndex += 1;
    } else if (line.match(/pousse\s+(.+)\s+dans\s+(\w+);/)) {
      const [, expr, listName] =
        line.match(/pousse\s+(.+)\s+dans\s+(\w+);/) ?? [];
      getList(mem, listName).push(evaluatePrefix(infixToPrefix(expr), mem));
      mem.lineIndex += 1;
    } else if (line.match(/tire\s+(.+)\s+dans\s+(\w+);/)) {
      const [, expr, listName] =
        line.match(/tire\s+(.+)\s+dans\s+(\w+);/) ?? [];
      getList(mem, listName).unshift(evaluatePrefix(infixToPrefix(expr), mem));
      mem.lineIndex += 1;
    } else {
      mem.lineIndex += 1;
    }
  }
  // console.log(mem);
}

main();
