const blackSelectorList = {
  weapp: ["\\\\?:focus-within", "\\\\?:hover", "\\\\?:focus", ">", "\\*"],
  tt: ["\\\\?:focus-within", "\\\\?:hover", "\\\\?:focus"],
};

const index = process.argv.findIndex((item) => item === "--type");
const type = index === -1 ? "weapp" : process.argv[index + 1];

function isSupported(selector, blackList = blackSelectorList.weapp) {
  return !blackList.some((item) => new RegExp(item).test(selector));
}

export default () => {
  return {
    postcssPlugin: 'postcss-taro-tailwind-better',
    Once: (root) => {
      root.walkRules((rule) => {
        if (!isSupported(rule.selector, blackSelectorList[type])) {
          rule.remove();
        }
      });
    }
  }
  // return (root) => {
  //   root.walkRules((rule) => {
  //     // @ts-ignore
  //     if (rule.parent.name === "media") {
  //       rule.parent.remove();
  //     }
  //     if (!isSupported(rule.selector, blackSelectorList[type])) {
  //       rule.remove();
  //     }

  //     rule.walkDecls((decl) => {
  //       if (decl.prop === "visibility") {
  //         switch (decl.value) {
  //           case "hidden":
  //             decl.replaceWith(decl.clone({ value: "collapse" }));
  //             return;
  //         }
  //       }

  //       if (decl.prop === "vertical-align") {
  //         switch (decl.value) {
  //           case "middle":
  //             decl.replaceWith(decl.clone({ value: "center" }));
  //             return;
  //         }
  //       }

  //       // allow using rem values (default unit in tailwind)
  //       if (decl.value.includes("rem") && !decl.value.includes("--")) {
  //         decl.value = "" + parseFloat(decl.value) * 16 + "px";
  //       }
  //     });
  //   });
  // };
}
