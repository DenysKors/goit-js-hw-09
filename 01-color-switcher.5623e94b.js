let t=t=>document.querySelector(t),a=null;t("[data-stop]").disabled=!0,t("[data-start]").addEventListener("click",(function(){t("[data-start]").disabled=!0,t("[data-stop]").disabled=!1,a=setInterval((()=>{t("body").style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t("[data-stop]").addEventListener("click",(function(){clearInterval(a),t("[data-start]").disabled=!1,t("[data-stop]").disabled=!0}));
//# sourceMappingURL=01-color-switcher.5623e94b.js.map