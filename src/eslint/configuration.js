const path = require("path");

/* Eslint configuration relies on referencing plugins by their names.
   Unfortunately, when using shared configs, it looks for plugins in node_modules of the dependent,
   but plugins are listed in dependencies of this package, and they might get randomly lost,
   just because hoisting didn't work, or somethig.
   This adds `node_modules` of `opstooling-js-style` to NODE_PATH, so plugins would always be found */

process.env.NODE_PATH =
  `${process.env.NODE_PATH ? process.env.NODE_PATH + ":" : ""}` + path.join(__dirname, "..", "..", "node_modules");
require("module").Module._initPaths();

const baseRules = {
  // prettier
  "prettier/prettier": "error",
  "no-extra-semi": "off",
  "no-empty": "off",

  // related to the "unused-imports" plugin
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": "off",
  "unused-imports/no-unused-imports-ts": "error",
  "unused-imports/no-unused-vars-ts": [
    "error",
    { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
  ],

  // related to import sorting and ordering
  "sort-imports": "off",
  "import/order": "off",
  "no-multi-spaces": "error",
  "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
  "simple-import-sort/imports": [
    "error",
    { groups: [["^([^s.]|s($|[^r])|s($|[^r]$|r[^c])|sr($|c[^/]))"], ["^src"], ["."]] },
  ],
  "import/first": "error",
  "import/newline-after-import": "error",
  "import/no-duplicates": ["error", { considerQueryString: true }],
  "no-restricted-imports": "off",

  // sonarjs
  "sonarjs/no-all-duplicated-branches": "error",
  "sonarjs/no-element-overwrite": "error",
  "sonarjs/no-empty-collection": "error",
  "sonarjs/no-extra-arguments": "error",
  "sonarjs/no-identical-conditions": "error",
  "sonarjs/no-identical-expressions": "error",
  "sonarjs/no-ignored-return": "error",
  "sonarjs/no-use-of-empty-return-value": "error",
  "sonarjs/no-collapsible-if": "error",
  "sonarjs/non-existent-operator": "error",
  "sonarjs/no-collection-size-mischeck": "error",
  "sonarjs/no-gratuitous-expressions": "error",
  "sonarjs/no-duplicated-branches": "error",
  "sonarjs/no-redundant-boolean": "error",
  "sonarjs/no-redundant-jump": "error",
  "sonarjs/no-unused-collection": "error",
  "sonarjs/prefer-immediate-return": "error",

  // misc
  "no-unreachable-loop": "error",
  "multiline-comment-style": "off",
  "no-constant-condition": "off",
  "require-atomic-updates": "off",
  "use-isnan": "error",
  "no-restricted-syntax": [
    "error",
    ':not(MethodDefinition, AssignmentExpression[left.type="MemberExpression"], VariableDeclarator[init.generator=true]) > FunctionExpression',
    {
      selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
      message: "setTimeout must always be invoked with two arguments.",
    },
    {
      selector: "CallExpression[callee.name='setInterval'][arguments.length!=2]",
      message: "setInterval must always be invoked with two arguments.",
    },
    {
      selector: "CallExpression[arguments.length=1] > MemberExpression.callee > Identifier.property[name='reduce']",
      message: "Provide initialValue to .reduce().",
    },
  ],
  "prefer-arrow-callback": "error",
  "constructor-super": "error",
  "no-invalid-this": "error",
  "spaced-comment": "error",
  "dot-notation": "error",
  "no-redeclare": "error",
  "arrow-parens": "error",
  "arrow-body-style": ["error", "as-needed", { requireReturnForObjectLiteral: true }],
};

const typescriptRules = {
  "no-undef": "off", // this rule is already checked by TypeScript itself
  "@typescript-eslint/strict-boolean-expressions": [
    "error",
    {
      allowString: true,
      allowNullableBoolean: true,
      allowNumber: true,
      allowNullableNumber: true,
      allowNullableString: true,
    },
  ],
  "@typescript-eslint/explicit-module-boundary-types": ["error", { allowHigherOrderFunctions: true }],
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/no-empty-interface": "off",
  "@typescript-eslint/interface-name-prefix": "off",
  "@typescript-eslint/no-inferrable-types": "off",
  "@typescript-eslint/restrict-plus-operands": "error",
  "@typescript-eslint/restrict-template-expressions": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-misused-new": "error",
  "@typescript-eslint/await-thenable": "error",
  "no-return-await": "off", // conflicts with @typescript-eslint/return-await
  "@typescript-eslint/return-await": ["error", "always"],
  "@typescript-eslint/require-await": "error",
  "@typescript-eslint/no-throw-literal": "error",
  "@typescript-eslint/no-shadow": "error",
  "@typescript-eslint/array-type": "error",
  "@typescript-eslint/ban-ts-comment": "error",
  "@typescript-eslint/ban-types": "error",
  "@typescript-eslint/consistent-type-assertions": [
    "error",
    { assertionStyle: "as", objectLiteralTypeAssertions: "allow-as-parameter" },
  ],
  "@typescript-eslint/no-for-in-array": "error",
  "@typescript-eslint/no-invalid-void-type": "error",
  "@typescript-eslint/no-meaningless-void-operator": "error",
  "@typescript-eslint/no-misused-promises": "error",
  "@typescript-eslint/no-unnecessary-type-arguments": "error",
  "@typescript-eslint/no-unsafe-argument": "error",
  "@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-call": "error",
  "@typescript-eslint/prefer-for-of": "error",
  "@typescript-eslint/switch-exhaustiveness-check": "error",
  "@typescript-eslint/typedef": "error",
  "@typescript-eslint/unbound-method": "error",
  "@typescript-eslint/no-redeclare": "error",
  "@typescript-eslint/no-array-constructor": "error",
  "@typescript-eslint/no-invalid-this": "error",
  "@typescript-eslint/no-empty-function": "off",
  "dot-notation": "off", // can conflict with "@typescript-eslint/dot-notation"
  "@typescript-eslint/dot-notation": "error",
};

const baseExtends = ["eslint:recommended", "plugin:prettier/recommended", "plugin:svelte/recommended"];

const basePlugins = ["sonarjs", "unused-imports", "simple-import-sort", "import"];

const getTypescriptOverride = ({ rootDir }) => {
  return {
    plugins: [...basePlugins, "@typescript-eslint"],
    extends: [...baseExtends, "plugin:@typescript-eslint/recommended"],
    parserOptions: {
      project: path.join(rootDir, "tsconfig.json"),
      tsconfigRootDir: rootDir,
      extraFileExtensions: [".cjs"],
    },
    files: "{*,**,**/*}.{ts,tsx}",
    rules: { ...baseRules, ...typescriptRules },
  };
};

const getJestTypescriptOverride = () => {
  return {
    files: ["{*,**,**/*}.spec.ts", "**/__mocks__/{*,**,**/*}.{js,cjs,mjs,ts}"],
    plugins: ["jest"],
    rules: { "@typescript-eslint/unbound-method": "off", "jest/unbound-method": "error" },
  };
};

const getConfiguration = ({ typescript, browser } = {}) => {
  const overrides = [];

  if (typescript) {
    overrides.push(getTypescriptOverride(typescript));
    overrides.push(getJestTypescriptOverride());

    overrides.push({
      files: ["**/*.svelte"],
      parser: "svelte-eslint-parser",
      rules: {
        // this rule thinks of svelte's <script> imports as unused,
        // even if they are used with $notation in the template
        "unused-imports/no-unused-imports-ts": "off",
      },
      parserOptions: { parser: "@typescript-eslint/parser" },
    });
  }

  const env = { node: true };

  if (browser) {
    env.browser = true;
  }

  return {
    env,
    root: true,
    parser: "@typescript-eslint/parser",
    extends: baseExtends,
    plugins: basePlugins,
    rules: baseRules,
    overrides,
  };
};

module.exports = { getTypescriptOverride, getConfiguration };
