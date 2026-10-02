const Handlebars = require('handlebars/runtime');

module.exports = {
  "classic": Handlebars.template({"0":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div class=\"summary\">\n        <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Summary") : stack1), depth0))
    + "</h3>\n        <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"SummaryInfo") : depth0)) != null ? lookupProperty(stack1,"Text") : stack1), depth0))
    + "</p>\n      </div>\n      ";
},"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n      <div class=\"experience-section\">\n        <h3>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Experience") : stack1), depth0))
    + "</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ExperiencesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":187,"column":8},"end":{"line":200,"column":17}}})) != null ? stack1 : "")
    + "      </div>\n      ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"desc\">\n          <div class=\"header\">\n            <div class=\"info\">\n              <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":191,"column":22},"end":{"line":191,"column":31}}}) : helper)))
    + "</strong>\n              <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Company") || (depth0 != null ? lookupProperty(depth0,"Company") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Company","hash":{},"data":data,"loc":{"start":{"line":192,"column":20},"end":{"line":192,"column":31}}}) : helper)))
    + "</span>\n            </div>\n            <i>\n              "
    + alias4(((helper = (helper = lookupProperty(helpers,"StartDate") || (depth0 != null ? lookupProperty(depth0,"StartDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"StartDate","hash":{},"data":data,"loc":{"start":{"line":195,"column":14},"end":{"line":195,"column":27}}}) : helper)))
    + " - "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"IsCurrent") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":195,"column":30},"end":{"line":195,"column":97}}})) != null ? stack1 : "")
    + "\n            </i>\n          </div>\n          <p class=\"description\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Text") || (depth0 != null ? lookupProperty(depth0,"Text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Text","hash":{},"data":data,"loc":{"start":{"line":198,"column":33},"end":{"line":198,"column":41}}}) : helper)))
    + "</p>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && lookupProperty(data,"root"))) && lookupProperty(stack1,"Labels"))) && lookupProperty(stack1,"Present")), depth0));
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"EndDate") || (depth0 != null ? lookupProperty(depth0,"EndDate") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"EndDate","hash":{},"data":data,"loc":{"start":{"line":195,"column":79},"end":{"line":195,"column":90}}}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n      <div class=\"education-section\">\n        <h3>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Education") : stack1), depth0))
    + "</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"EducationsInfo") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":205,"column":8},"end":{"line":218,"column":17}}})) != null ? stack1 : "")
    + "      </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"desc\">\n          <div class=\"header\">\n            <div class=\"info\">\n              <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":209,"column":22},"end":{"line":209,"column":31}}}) : helper)))
    + "</strong>\n              <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Institute") || (depth0 != null ? lookupProperty(depth0,"Institute") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Institute","hash":{},"data":data,"loc":{"start":{"line":210,"column":20},"end":{"line":210,"column":33}}}) : helper)))
    + "</span>\n            </div>\n            <i>\n              "
    + alias4(((helper = (helper = lookupProperty(helpers,"StartDate") || (depth0 != null ? lookupProperty(depth0,"StartDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"StartDate","hash":{},"data":data,"loc":{"start":{"line":213,"column":14},"end":{"line":213,"column":27}}}) : helper)))
    + " - "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"IsCurrent") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":213,"column":30},"end":{"line":213,"column":97}}})) != null ? stack1 : "")
    + "\n            </i>\n          </div>\n          <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Gpa") || (depth0 != null ? lookupProperty(depth0,"Gpa") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Gpa","hash":{},"data":data,"loc":{"start":{"line":216,"column":13},"end":{"line":216,"column":20}}}) : helper)))
    + "</p>\n        </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <h3>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Skills") : stack1), depth0))
    + "</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"SkillsInfo") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":225,"column":10},"end":{"line":229,"column":19}}})) != null ? stack1 : "")
    + " ";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"gapped\">\n            <strong>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":227,"column":20},"end":{"line":227,"column":29}}}) : helper)))
    + "</strong>\n          </div>\n          ";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <h3>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Languages") : stack1), depth0))
    + "</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"LanguagesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":234,"column":10},"end":{"line":239,"column":19}}})) != null ? stack1 : "")
    + " ";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"certificate-item\">\n            <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":236,"column":20},"end":{"line":236,"column":29}}}) : helper)))
    + "</strong>\n            <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Scale") || (depth0 != null ? lookupProperty(depth0,"Scale") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Scale","hash":{},"data":data,"loc":{"start":{"line":237,"column":18},"end":{"line":237,"column":27}}}) : helper)))
    + "</span>\n          </div>\n          ";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div>\n            <h3>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Certificates") : stack1), depth0))
    + "</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"CertificatesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":247,"column":12},"end":{"line":252,"column":21}}})) != null ? stack1 : "")
    + "          </div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"certificate-item\">\n              <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":249,"column":22},"end":{"line":249,"column":31}}}) : helper)))
    + "</strong>\n              <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Issuer") || (depth0 != null ? lookupProperty(depth0,"Issuer") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Issuer","hash":{},"data":data,"loc":{"start":{"line":250,"column":20},"end":{"line":250,"column":30}}}) : helper)))
    + "</span>\n            </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div>\n            <h3>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"References") : stack1), depth0))
    + "</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ReferencesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":260,"column":12},"end":{"line":265,"column":21}}})) != null ? stack1 : "")
    + "          </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"certificate-item\">\n              <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"FullName") || (depth0 != null ? lookupProperty(depth0,"FullName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"FullName","hash":{},"data":data,"loc":{"start":{"line":262,"column":22},"end":{"line":262,"column":34}}}) : helper)))
    + "</strong>\n              <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Contact") || (depth0 != null ? lookupProperty(depth0,"Contact") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Contact","hash":{},"data":data,"loc":{"start":{"line":263,"column":20},"end":{"line":263,"column":31}}}) : helper)))
    + "</span>\n            </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<html lang=\""
    + alias2(((helper = (helper = lookupProperty(helpers,"Lang") || (depth0 != null ? lookupProperty(depth0,"Lang") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"Lang","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":20}}}) : helper)))
    + "\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + " - Özgeçmiş</title>\n    <link\n      rel=\"stylesheet\"\n      href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\"\n    />\n    <style>\n      body {\n        font-family: Arial, sans-serif;\n      }\n\n      .container {\n        max-width: 900px;\n        margin: auto;\n        padding: 24px;\n      }\n\n      h1 {\n        color: #000000;\n      }\n\n      h3 {\n        border-bottom: 2px solid #a8a8a8;\n        border-bottom-style: dotted;\n        padding-bottom: 5px;\n        text-transform: uppercase;\n        letter-spacing: 2px;\n        font-weight: normal;\n        font-size: small;\n        page-break-after: avoid;\n      }\n\n      h4 {\n        color: #a8a8a8;\n      }\n\n      .header {\n        display: flex;\n        flex-direction: row;\n        justify-content: space-between;\n        align-items: center;\n      }\n\n      .summary p {\n        font-size: 14px;\n      }\n\n      .desc .header {\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        justify-content: space-between;\n      }\n\n      .desc .header .info {\n        display: flex;\n        flex-direction: column;\n      }\n\n      .desc .header i {\n        color: #a8a8a8;\n      }\n\n      .desc .description {\n        white-space: pre-line;\n        font-size: 14px;\n      }\n\n      .experience-section .desc,\n      .education-section .desc,\n      .doublesection .gapped,\n      .doublesection .certificate-item,\n      .desc {\n        position: relative;\n        padding-left: 18px;\n      }\n\n      .experience-section .desc::before,\n      .education-section .desc::before,\n      .doublesection .gapped::before,\n      .doublesection .certificate-item::before {\n        content: \"•\";\n        position: absolute;\n        left: 0;\n      }\n\n      .desc,\n      .certificate-item {\n        page-break-inside: avoid;\n      }\n      .doublesection {\n        display: flex;\n        flex-direction: row;\n        justify-content: space-between;\n        gap: 24px;\n      }\n\n      .doublesection div {\n        flex: 1;\n      }\n\n      .doublesection .gapped {\n        display: flex;\n        flex-direction: row;\n        gap: 24px;\n        font-size: 14px;\n        align-items: center;\n        margin-bottom: 6px;\n      }\n\n      .doublesection .gapped div {\n        display: flex;\n        flex-direction: column;\n        font-size: 14px;\n      }\n\n      .certificate-item {\n        display: flex;\n        flex-direction: column;\n        margin-bottom: 8px;\n        font-size: 14px;\n      }\n      .contact-info .contact-item {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n      }\n\n      .contact-info .contact-item p {\n        margin: 4px;\n      }\n\n      .contact-info .contact-item i {\n        width: 14px;\n        text-align: center;\n        color: #000000;\n      }\n\n      @media print {\n        @page {\n          margin-top: 40px;\n        }\n\n        @page :first {\n          margin-top: 0;\n        }\n\n        .container {\n          margin: 0;\n        }\n      }\n    </style>\n  </head>\n  <body>\n    <div class=\"container\">\n      <div class=\"header\">\n        <div>\n          <h1>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + "</h1>\n          <h4>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"JobTitle") : stack1), depth0))
    + "</h4>\n        </div>\n        <div class=\"contact-info\">\n          <div class=\"contact-item\">\n            <i class=\"fas fa-envelope\"></i>\n            <p>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"Email") : stack1), depth0))
    + "</p>\n          </div>\n          <div class=\"contact-item\">\n            <i class=\"fas fa-phone\"></i>\n            <p>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"PhoneNumber") : stack1), depth0))
    + "</p>\n          </div>\n          <div class=\"contact-item\">\n            <i class=\"fas fa-link\"></i>\n            <p>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"Website") : stack1), depth0))
    + "</p>\n          </div>\n        </div>\n      </div>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"SummaryInfo") : depth0),{"name":"if","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":179,"column":6},"end":{"line":184,"column":13}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"ExperiencesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":184,"column":14},"end":{"line":202,"column":13}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"EducationsInfo") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":202,"column":14},"end":{"line":220,"column":13}}})) != null ? stack1 : "")
    + "      <div class=\"doublesection\">\n        <div style=\"flex: 1\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"SkillsInfo") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":223,"column":10},"end":{"line":229,"column":27}}})) != null ? stack1 : "")
    + "\n        </div>\n        <div style=\"flex: 1\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"LanguagesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":232,"column":10},"end":{"line":239,"column":27}}})) != null ? stack1 : "")
    + "\n        </div>\n      </div>\n      <div class=\"doublesection\">\n        <div style=\"flex: 1\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"CertificatesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":244,"column":10},"end":{"line":254,"column":17}}})) != null ? stack1 : "")
    + "        </div>\n        <div style=\"flex: 1\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"ReferencesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":257,"column":10},"end":{"line":267,"column":17}}})) != null ? stack1 : "")
    + "        </div>\n      </div>\n    </div>\n  </body>\n</html>\n";
},"useData":true}),
  "coverletter": Handlebars.template({"0":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"JobTitle") : stack1), depth0))
    + "</p>\r\n";
},"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"PhoneNumber") : stack1), depth0))
    + "</div>\r\n          ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n          <div>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"Email") : stack1), depth0))
    + "</div>\r\n          ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n          <div>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"Address") : stack1), depth0))
    + "</div>\r\n          ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n          <div>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"Website") : stack1), depth0))
    + "</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\r\n<html lang=\""
    + alias2(((helper = (helper = lookupProperty(helpers,"Lang") || (depth0 != null ? lookupProperty(depth0,"Lang") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"Lang","hash":{},"data":data,"loc":{"start":{"line":2,"column":12},"end":{"line":2,"column":20}}}) : helper)))
    + "\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + " - Cover Letter</title>\r\n    <style>\r\n      @import url(\"https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans:wght@400;600&family=Dancing+Script:wght@400&display=swap\");\r\n\r\n      body {\r\n        background-color: #f4f4f4;\r\n        font-family: \"Open Sans\", sans-serif;\r\n        color: #333;\r\n        margin: 0;\r\n        padding: 20px;\r\n        display: flex;\r\n        justify-content: center;\r\n      }\r\n\r\n      .page {\r\n        background-color: white;\r\n        width: 210mm;\r\n        min-height: 297mm;\r\n        padding: 15mm 20mm;\r\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\r\n        box-sizing: border-box;\r\n        position: relative;\r\n      }\r\n\r\n      .header {\r\n        display: flex;\r\n        justify-content: space-between;\r\n        align-items: flex-start;\r\n        margin-bottom: 15px;\r\n      }\r\n\r\n      .sender-identity h1 {\r\n        font-family: \"Montserrat\", sans-serif;\r\n        font-size: 28pt;\r\n        font-weight: 500;\r\n        text-transform: uppercase;\r\n        letter-spacing: 2px;\r\n        margin: 0;\r\n        color: #000;\r\n      }\r\n\r\n      .sender-identity p {\r\n        font-family: \"Montserrat\", sans-serif;\r\n        font-size: 14pt;\r\n        margin: 5px 0 0 0;\r\n        font-weight: 400;\r\n      }\r\n\r\n      .sender-contact {\r\n        text-align: right;\r\n        font-size: 10pt;\r\n        line-height: 1.5;\r\n      }\r\n\r\n      .sender-contact div {\r\n        margin-bottom: 2px;\r\n      }\r\n\r\n      hr {\r\n        border: 0;\r\n        border-top: 1px solid #333;\r\n        margin: 20px 0;\r\n      }\r\n\r\n      .date-section {\r\n        text-align: right;\r\n        margin-bottom: 30px;\r\n        font-size: 11pt;\r\n      }\r\n\r\n      .recipient-section {\r\n        margin-bottom: 30px;\r\n        font-size: 11pt;\r\n        line-height: 1.5;\r\n      }\r\n\r\n      .recipient-section strong {\r\n        font-weight: 600;\r\n      }\r\n\r\n      .subject-line {\r\n        font-family: \"Montserrat\", sans-serif;\r\n        text-transform: uppercase;\r\n        font-size: 12pt;\r\n        letter-spacing: 1px;\r\n        margin-bottom: 30px;\r\n      }\r\n\r\n      .content {\r\n        font-size: 11pt;\r\n        line-height: 1.6;\r\n        text-align: justify;\r\n        width: 100%;\r\n      }\r\n\r\n      .content p {\r\n        margin-bottom: 15px;\r\n        white-space: pre-line;\r\n        overflow-wrap: break-word;\r\n        word-wrap: break-word;\r\n        word-break: normal;\r\n        max-width: 100%;\r\n      }\r\n\r\n      .footer {\r\n        margin-top: 40px;\r\n      }\r\n\r\n      .sign-off {\r\n        margin-bottom: 30px;\r\n      }\r\n\r\n      .printed-name {\r\n        font-family: \"Open Sans\", sans-serif;\r\n        font-size: 11pt;\r\n        margin-bottom: 5px;\r\n      }\r\n\r\n      .signature {\r\n        font-family: \"Dancing Script\", cursive;\r\n        font-size: 24pt;\r\n        color: #333;\r\n      }\r\n\r\n      @media print {\r\n        body {\r\n          background-color: white;\r\n          padding: 0;\r\n        }\r\n        .page {\r\n          box-shadow: none;\r\n          width: 100%;\r\n          height: auto;\r\n          padding: 15mm 20mm;\r\n        }\r\n      }\r\n    </style>\r\n  </head>\r\n  <body>\r\n    <div class=\"page\">\r\n      <div class=\"header\">\r\n        <div class=\"sender-identity\">\r\n          <h1>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + "</h1>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"JobTitle") : stack1),{"name":"if","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":149,"column":10},"end":{"line":151,"column":17}}})) != null ? stack1 : "")
    + "        </div>\r\n        <div class=\"sender-contact\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"PhoneNumber") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":154,"column":10},"end":{"line":156,"column":17}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"Email") : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":156,"column":18},"end":{"line":158,"column":17}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"Address") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":158,"column":18},"end":{"line":160,"column":17}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"Website") : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":160,"column":18},"end":{"line":162,"column":17}}})) != null ? stack1 : "")
    + "        </div>\r\n      </div>\r\n\r\n      <hr />\r\n\r\n      <div class=\"date-section\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"MetaInfo") : depth0)) != null ? lookupProperty(stack1,"SentDate") : stack1), depth0))
    + "</div>\r\n\r\n      <div class=\"recipient-section\">\r\n        <div><strong>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"RecipientInfo") : depth0)) != null ? lookupProperty(stack1,"HiringManagerName") : stack1), depth0))
    + "</strong></div>\r\n        <div>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"RecipientInfo") : depth0)) != null ? lookupProperty(stack1,"CompanyName") : stack1), depth0))
    + "</div>\r\n      </div>\r\n\r\n      <div class=\"subject-line\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"MetaInfo") : depth0)) != null ? lookupProperty(stack1,"Subject") : stack1), depth0))
    + "</div>\r\n\r\n      <div class=\"content\">\r\n        <p>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"Content") : depth0)) != null ? lookupProperty(stack1,"Salutation") : stack1), depth0))
    + "</p>\r\n\r\n        <p>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"Content") : depth0)) != null ? lookupProperty(stack1,"Introduction") : stack1), depth0))
    + "</p>\r\n\r\n        <p>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"Content") : depth0)) != null ? lookupProperty(stack1,"Body") : stack1), depth0))
    + "</p>\r\n\r\n        <p>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"Content") : depth0)) != null ? lookupProperty(stack1,"Conclusion") : stack1), depth0))
    + "</p>\r\n      </div>\r\n\r\n      <div class=\"footer\">\r\n        <div class=\"sign-off\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"Content") : depth0)) != null ? lookupProperty(stack1,"SignOff") : stack1), depth0))
    + "</div>\r\n\r\n        <div class=\"printed-name\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + "</div>\r\n\r\n        <div class=\"signature\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"SenderInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + "</div>\r\n      </div>\r\n    </div>\r\n  </body>\r\n</html>\r\n";
},"useData":true}),
  "minimal": Handlebars.template({"0":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Summary") : stack1), depth0))
    + "</h2>\n          <p class=\"profile-summary\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"SummaryInfo") : depth0)) != null ? lookupProperty(stack1,"Text") : stack1), depth0))
    + "</p>\n        </section>\n        ";
},"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Experience") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ExperiencesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":229,"column":10},"end":{"line":251,"column":19}}})) != null ? stack1 : "")
    + "        </section>\n        ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"item-container\">\n            <div class=\"item-header\">\n              <div class=\"left\">\n                <p class=\"item-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Company") || (depth0 != null ? lookupProperty(depth0,"Company") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Company","hash":{},"data":data,"loc":{"start":{"line":233,"column":38},"end":{"line":233,"column":49}}}) : helper)))
    + "</p>\n                <p class=\"item-subtitle\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":234,"column":41},"end":{"line":234,"column":50}}}) : helper)))
    + "</p>\n                <p class=\"item-detail\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Location") || (depth0 != null ? lookupProperty(depth0,"Location") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Location","hash":{},"data":data,"loc":{"start":{"line":235,"column":39},"end":{"line":235,"column":51}}}) : helper)))
    + "</p>\n              </div>\n              <div class=\"right\">\n                <span class=\"date\"\n                  >"
    + alias4(((helper = (helper = lookupProperty(helpers,"StartDate") || (depth0 != null ? lookupProperty(depth0,"StartDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"StartDate","hash":{},"data":data,"loc":{"start":{"line":239,"column":19},"end":{"line":239,"column":32}}}) : helper)))
    + " - "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"IsCurrent") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":239,"column":35},"end":{"line":240,"column":84}}})) != null ? stack1 : "")
    + "</span\n                >\n              </div>\n            </div>\n\n            <div class=\"item-description\">\n              <ul>\n                <li>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Text") || (depth0 != null ? lookupProperty(depth0,"Text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Text","hash":{},"data":data,"loc":{"start":{"line":247,"column":20},"end":{"line":247,"column":28}}}) : helper)))
    + "</li>\n              </ul>\n            </div>\n          </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && lookupProperty(data,"root"))) && lookupProperty(stack1,"Labels"))) && lookupProperty(stack1,"PresentLower")), depth0));
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"EndDate") || (depth0 != null ? lookupProperty(depth0,"EndDate") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"EndDate","hash":{},"data":data,"loc":{"start":{"line":240,"column":66},"end":{"line":240,"column":77}}}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Education") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"EducationsInfo") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":256,"column":10},"end":{"line":273,"column":19}}})) != null ? stack1 : "")
    + "        </section>\n        ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"item-container\">\n            <div class=\"item-header\">\n              <div class=\"left\">\n                <p class=\"item-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Institute") || (depth0 != null ? lookupProperty(depth0,"Institute") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Institute","hash":{},"data":data,"loc":{"start":{"line":260,"column":38},"end":{"line":260,"column":51}}}) : helper)))
    + "</p>\n                <p class=\"item-subtitle\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":261,"column":41},"end":{"line":261,"column":50}}}) : helper)))
    + "</p>\n              </div>\n              <div class=\"right\">\n                <span class=\"date\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"EndDate") || (depth0 != null ? lookupProperty(depth0,"EndDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"EndDate","hash":{},"data":data,"loc":{"start":{"line":264,"column":35},"end":{"line":264,"column":46}}}) : helper)))
    + "</span>\n              </div>\n            </div>\n            <div class=\"item-description\">\n              <ul>\n                <li><p class=\"item-detail\">"
    + alias4(container.lambda(((stack1 = ((stack1 = (data && lookupProperty(data,"root"))) && lookupProperty(stack1,"Labels"))) && lookupProperty(stack1,"Gpa")), depth0))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"Gpa") || (depth0 != null ? lookupProperty(depth0,"Gpa") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Gpa","hash":{},"data":data,"loc":{"start":{"line":269,"column":64},"end":{"line":269,"column":71}}}) : helper)))
    + "</p></li>\n              </ul>\n            </div>\n          </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Skills") : stack1), depth0))
    + "</h2>\n          <ul class=\"skills-grid\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"SkillsInfo") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":279,"column":12},"end":{"line":281,"column":21}}})) != null ? stack1 : "")
    + "          </ul>\n        </section>\n        ";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <li>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":280,"column":16},"end":{"line":280,"column":25}}}) : helper)))
    + "</li>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Languages") : stack1), depth0))
    + "</h2>\n          <div class=\"language-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"LanguagesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":288,"column":12},"end":{"line":289,"column":58}}})) != null ? stack1 : "")
    + "\n          </div>\n        </section>\n        ";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":289,"column":20},"end":{"line":289,"column":29}}}) : helper)))
    + "</strong> "
    + alias4(((helper = (helper = lookupProperty(helpers,"Scale") || (depth0 != null ? lookupProperty(depth0,"Scale") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Scale","hash":{},"data":data,"loc":{"start":{"line":289,"column":39},"end":{"line":289,"column":48}}}) : helper)))
    + " ";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Certificates") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"CertificatesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":295,"column":10},"end":{"line":301,"column":19}}})) != null ? stack1 : "")
    + "        </section>\n        ";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"award-item\">\n            <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":297,"column":20},"end":{"line":297,"column":29}}}) : helper)))
    + "</strong>\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Issuer") || (depth0 != null ? lookupProperty(depth0,"Issuer") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Issuer","hash":{},"data":data,"loc":{"start":{"line":298,"column":15},"end":{"line":298,"column":25}}}) : helper)))
    + "</p>\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Date") || (depth0 != null ? lookupProperty(depth0,"Date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Date","hash":{},"data":data,"loc":{"start":{"line":299,"column":15},"end":{"line":299,"column":23}}}) : helper)))
    + "</p>\n          </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"References") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ReferencesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":306,"column":10},"end":{"line":311,"column":19}}})) != null ? stack1 : "")
    + "        </section>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"award-item\">\n            <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"FullName") || (depth0 != null ? lookupProperty(depth0,"FullName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"FullName","hash":{},"data":data,"loc":{"start":{"line":308,"column":20},"end":{"line":308,"column":32}}}) : helper)))
    + "</strong>\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Contact") || (depth0 != null ? lookupProperty(depth0,"Contact") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Contact","hash":{},"data":data,"loc":{"start":{"line":309,"column":15},"end":{"line":309,"column":26}}}) : helper)))
    + "</p>\n          </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<html lang=\""
    + alias2(((helper = (helper = lookupProperty(helpers,"Lang") || (depth0 != null ? lookupProperty(depth0,"Lang") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"Lang","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":20}}}) : helper)))
    + "\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + " - Özgeçmiş</title>\n    <link\n      rel=\"stylesheet\"\n      href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\"\n    />\n    <style>\n      body {\n        font-family: Arial, sans-serif;\n        background-color: #ffffff;\n        margin: 0;\n        padding: 0;\n      }\n\n      .resume-container {\n        max-width: 900px;\n        margin: 30px auto;\n        background-color: #fff;\n        padding: 40px;\n        box-shadow: none;\n        min-height: 1100px;\n      }\n\n      .header-section {\n        text-align: center;\n        margin-bottom: 25px;\n      }\n\n      .header-section h1 {\n        font-size: 2.2em;\n        margin: 0 0 5px 0;\n        font-weight: 600;\n        color: #222;\n      }\n\n      .contact-details {\n        display: flex;\n        justify-content: center;\n        gap: 0 25px;\n        font-size: 0.9em;\n        color: #555;\n      }\n\n      .contact-details i {\n        margin-right: 6px;\n        color: #222; /* İkon rengini daha görünür yaptım */\n      }\n\n      .fas {\n        font-family: \"Font Awesome 6 Free\";\n        font-weight: 900;\n        font-style: normal;\n      }\n\n      .section {\n        margin-top: 25px;\n      }\n\n      .section-title {\n        font-size: 1.2em;\n        font-weight: 700;\n        color: #222;\n        margin-bottom: 8px;\n        padding-bottom: 5px;\n        border-bottom: 2px solid #222;\n        text-transform: uppercase;\n      }\n\n      .section-title {\n        page-break-after: avoid;\n      }\n\n      .profile-summary {\n        font-size: 0.95em;\n        line-height: 1.6;\n        color: #555;\n      }\n\n      .item-container {\n        margin-bottom: 18px;\n        position: relative;\n        page-break-inside: avoid;\n      }\n\n      .award-item {\n        page-break-inside: avoid;\n      }\n\n      .item-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: flex-start;\n        margin-bottom: 5px;\n      }\n\n      .item-header .left {\n        flex: 1;\n      }\n\n      .item-header .right {\n        flex: 0 0 auto;\n        font-size: 0.9em;\n        font-weight: 500;\n        color: #555;\n        text-align: right;\n        margin-left: 10px;\n      }\n\n      .item-title {\n        font-size: 1.05em;\n        font-weight: 700;\n        color: #222;\n        margin: 0;\n      }\n\n      .item-subtitle {\n        font-size: 1em;\n        font-weight: 600;\n        color: #444;\n        margin: 2px 0;\n      }\n\n      .item-detail {\n        font-size: 0.9em;\n        font-weight: 400;\n        color: #666;\n        margin: 0;\n      }\n\n      .item-description ul {\n        padding-left: 20px;\n        margin-top: 5px;\n        font-size: 0.9em;\n        color: #555;\n        line-height: 1.5;\n        list-style-type: disc;\n      }\n\n      .item-description ul li {\n        margin-bottom: 4px;\n      }\n\n      .skills-grid {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 15px 30px;\n        font-size: 0.9em;\n        color: #333;\n        margin-top: 10px;\n        padding-left: 15px;\n      }\n\n      .skills-grid li {\n        list-style-type: disc;\n        flex: 0 0 22%;\n      }\n\n      .language-list {\n        display: flex;\n        justify-content: flex-start;\n        gap: 30px;\n        padding: 5px 0;\n        font-size: 0.9em;\n        color: #444;\n      }\n\n      .language-list strong {\n        font-weight: 600;\n      }\n\n      .award-item {\n        page-break-inside: avoid;\n        margin-bottom: 10px;\n        font-size: 0.9em;\n      }\n\n      .award-item strong {\n        display: block;\n        font-weight: 600;\n        font-size: 1em;\n        color: #333;\n      }\n\n      .award-item p {\n        margin: 2px 0 0 0;\n        color: #666;\n      }\n\n      @media print {\n        @page {\n          margin-top: 40px;\n        }\n\n        @page :first {\n          margin-top: 0;\n        }\n\n        .resume-container {\n          min-height: 0;\n          margin: 0;\n        }\n      }\n    </style>\n  </head>\n  <body>\n    <div class=\"resume-container\">\n      <header class=\"header-section\">\n        <h1>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + "</h1>\n\n        <div class=\"contact-details\">\n          <div><i class=\"fas fa-envelope\"></i> "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"Email") : stack1), depth0))
    + "</div>\n          <div><i class=\"fas fa-phone\"></i> "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"PhoneNumber") : stack1), depth0))
    + "</div>\n          <div><i class=\"fas fa-globe\"></i> "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"Website") : stack1), depth0))
    + "</div>\n        </div>\n      </header>\n\n      <main>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"SummaryInfo") : depth0),{"name":"if","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":221,"column":8},"end":{"line":226,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"ExperiencesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":226,"column":16},"end":{"line":253,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"EducationsInfo") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":253,"column":16},"end":{"line":275,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"SkillsInfo") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":275,"column":16},"end":{"line":284,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"LanguagesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":284,"column":16},"end":{"line":292,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"CertificatesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":292,"column":16},"end":{"line":303,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"ReferencesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":303,"column":16},"end":{"line":313,"column":15}}})) != null ? stack1 : "")
    + "      </main>\n    </div>\n  </body>\n</html>\n";
},"useData":true}),
  "modern": Handlebars.template({"0":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img\n          src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"PhotoInfo") : depth0)) != null ? lookupProperty(stack1,"Base64Image") : stack1), depth0))
    + "\"\n          alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + "\"\n          class=\"profile-pic\"\n        />\n        ";
},"1":function(container,depth0,helpers,partials,data) {
    return "";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Summary") : stack1), depth0))
    + "</h2>\n          <p class=\"profile-summary\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"SummaryInfo") : depth0)) != null ? lookupProperty(stack1,"Text") : stack1), depth0))
    + "</p>\n        </section>\n        ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Experience") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ExperiencesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":256,"column":10},"end":{"line":271,"column":19}}})) != null ? stack1 : "")
    + "        </section>\n        ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"item-container\">\n            <div class=\"item-left\">\n              <p>\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"StartDate") || (depth0 != null ? lookupProperty(depth0,"StartDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"StartDate","hash":{},"data":data,"loc":{"start":{"line":260,"column":16},"end":{"line":260,"column":29}}}) : helper)))
    + " - "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"IsCurrent") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":260,"column":32},"end":{"line":260,"column":99}}})) != null ? stack1 : "")
    + "\n              </p>\n            </div>\n            <div class=\"item-right\">\n              <p class=\"company\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Company") || (depth0 != null ? lookupProperty(depth0,"Company") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Company","hash":{},"data":data,"loc":{"start":{"line":264,"column":33},"end":{"line":264,"column":44}}}) : helper)))
    + "</p>\n              <p class=\"position\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":265,"column":34},"end":{"line":265,"column":43}}}) : helper)))
    + "</p>\n              <ul>\n                <li>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Text") || (depth0 != null ? lookupProperty(depth0,"Text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Text","hash":{},"data":data,"loc":{"start":{"line":267,"column":20},"end":{"line":267,"column":28}}}) : helper)))
    + "</li>\n              </ul>\n            </div>\n          </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && lookupProperty(data,"root"))) && lookupProperty(stack1,"Labels"))) && lookupProperty(stack1,"Present")), depth0));
},"6":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"EndDate") || (depth0 != null ? lookupProperty(depth0,"EndDate") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"EndDate","hash":{},"data":data,"loc":{"start":{"line":260,"column":81},"end":{"line":260,"column":92}}}) : helper)));
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Education") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"EducationsInfo") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":276,"column":10},"end":{"line":291,"column":19}}})) != null ? stack1 : "")
    + "        </section>\n        ";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"item-container\">\n            <div class=\"item-left\">\n              <p>\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"StartDate") || (depth0 != null ? lookupProperty(depth0,"StartDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"StartDate","hash":{},"data":data,"loc":{"start":{"line":280,"column":16},"end":{"line":280,"column":29}}}) : helper)))
    + " - "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"IsCurrent") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":280,"column":32},"end":{"line":280,"column":99}}})) != null ? stack1 : "")
    + "\n              </p>\n            </div>\n            <div class=\"item-right\">\n              <p class=\"degree\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":284,"column":32},"end":{"line":284,"column":41}}}) : helper)))
    + "</p>\n              <p class=\"school\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Institute") || (depth0 != null ? lookupProperty(depth0,"Institute") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Institute","hash":{},"data":data,"loc":{"start":{"line":285,"column":32},"end":{"line":285,"column":45}}}) : helper)))
    + "</p>\n              <ul>\n                <li>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Gpa") || (depth0 != null ? lookupProperty(depth0,"Gpa") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Gpa","hash":{},"data":data,"loc":{"start":{"line":287,"column":20},"end":{"line":287,"column":27}}}) : helper)))
    + "</li>\n              </ul>\n            </div>\n          </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Skills") : stack1), depth0))
    + "</h2>\n          <ul class=\"skills-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"SkillsInfo") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":297,"column":12},"end":{"line":299,"column":21}}})) != null ? stack1 : "")
    + "          </ul>\n        </section>\n        ";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <li>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":298,"column":16},"end":{"line":298,"column":25}}}) : helper)))
    + "</li>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Languages") : stack1), depth0))
    + "</h2>\n          <div class=\"language-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"LanguagesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":306,"column":12},"end":{"line":308,"column":21}}})) != null ? stack1 : "")
    + "          </div>\n        </section>\n        ";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"lang-item\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":307,"column":35},"end":{"line":307,"column":44}}}) : helper)))
    + " - "
    + alias4(((helper = (helper = lookupProperty(helpers,"Scale") || (depth0 != null ? lookupProperty(depth0,"Scale") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Scale","hash":{},"data":data,"loc":{"start":{"line":307,"column":47},"end":{"line":307,"column":56}}}) : helper)))
    + "</div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Certificates") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"CertificatesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":314,"column":10},"end":{"line":319,"column":19}}})) != null ? stack1 : "")
    + "        </section>\n        ";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"award-item\">\n            <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":316,"column":20},"end":{"line":316,"column":29}}}) : helper)))
    + "</strong>\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Issuer") || (depth0 != null ? lookupProperty(depth0,"Issuer") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Issuer","hash":{},"data":data,"loc":{"start":{"line":317,"column":15},"end":{"line":317,"column":25}}}) : helper)))
    + "</p>\n          </div>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"References") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ReferencesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":324,"column":10},"end":{"line":329,"column":19}}})) != null ? stack1 : "")
    + "        </section>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"award-item\">\n            <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"FullName") || (depth0 != null ? lookupProperty(depth0,"FullName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"FullName","hash":{},"data":data,"loc":{"start":{"line":326,"column":20},"end":{"line":326,"column":32}}}) : helper)))
    + "</strong>\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Contact") || (depth0 != null ? lookupProperty(depth0,"Contact") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Contact","hash":{},"data":data,"loc":{"start":{"line":327,"column":15},"end":{"line":327,"column":26}}}) : helper)))
    + "</p>\n          </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<html lang=\""
    + alias2(((helper = (helper = lookupProperty(helpers,"Lang") || (depth0 != null ? lookupProperty(depth0,"Lang") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"Lang","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":20}}}) : helper)))
    + "\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + " - Özgeçmiş</title>\n    <link\n      rel=\"stylesheet\"\n      href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\"\n    />\n    <style>\n      body {\n        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto,\n          \"Helvetica Neue\", Arial, sans-serif;\n        background-color: #ffffff;\n        margin: 0;\n        color: #333;\n      }\n\n      .resume-container {\n        max-width: 900px;\n        margin: auto;\n        background-color: #ffffff;\n        padding: 20px 40px;\n        box-shadow: none;\n        border-radius: 0;\n        min-height: 1100px;\n      }\n\n      .header-section {\n        display: flex;\n        align-items: center;\n        padding-bottom: 20px;\n      }\n\n      .profile-pic {\n        width: 110px;\n        height: 110px;\n        border-radius: 50%;\n        object-fit: cover;\n        margin-right: 30px;\n      }\n\n      .contact-info {\n        flex-grow: 1;\n      }\n\n      .contact-info h1 {\n        margin: 0 0 5px 0;\n        font-size: 2.2em;\n        color: #222;\n      }\n\n      .contact-info .title {\n        font-size: 1.3em;\n        font-weight: 300;\n        color: #555;\n        margin: 0;\n      }\n\n      .contact-details {\n        margin-top: 15px;\n        display: flex;\n        flex-wrap: wrap;\n        gap: 10px 20px;\n        font-size: 0.9em;\n        color: #444;\n      }\n\n      .contact-details div {\n        display: flex;\n        align-items: center;\n      }\n\n      .contact-details i {\n        margin-right: 8px;\n        color: #777;\n        width: 16px;\n        text-align: center;\n      }\n\n      .section {\n        margin-top: 25px;\n      }\n\n      .section-title {\n        font-size: 1.4em;\n        font-weight: 600;\n        color: #333;\n        margin-bottom: 5px;\n        padding-bottom: 5px;\n        border-bottom: 2px solid #e0e0e0;\n        page-break-after: avoid;\n      }\n\n      .profile-summary {\n        font-size: 0.95em;\n        line-height: 1.6;\n        color: #555;\n      }\n\n      .item-container {\n        display: flex;\n        margin-top: 20px;\n        page-break-inside: avoid;\n      }\n\n      .item-left {\n        flex: 0 0 175px;\n        font-size: 0.9em;\n        color: #666;\n        padding-right: 15px;\n      }\n\n      .item-left p {\n        margin: 0;\n      }\n\n      .item-right {\n        flex: 1;\n        padding-left: 15px;\n        border-left: 1px solid #eee;\n      }\n\n      .item-right .company,\n      .item-right .degree {\n        font-size: 1.1em;\n        font-weight: 700;\n        color: #000;\n        margin: 0;\n      }\n\n      .item-right .position,\n      .item-right .school {\n        font-size: 1em;\n        font-weight: 500;\n        color: #444;\n        margin: 4px 0 10px 0;\n      }\n\n      .item-right ul {\n        margin: 0;\n        padding-left: 20px;\n        font-size: 0.9em;\n        color: #555;\n        line-height: 1.5;\n        word-wrap: break-word;\n        overflow-wrap: break-word;\n        padding-right: 5px;\n      }\n\n      .item-right ul li {\n        margin-bottom: 5px;\n        list-style-position: outside;\n      }\n\n      .skills-list {\n        padding-left: 20px;\n        column-count: 3;\n        column-gap: 30px;\n        font-size: 0.9em;\n        color: #555;\n      }\n\n      .skills-list li {\n        margin-bottom: 8px;\n      }\n\n      .language-list {\n        display: flex;\n        justify-content: flex-start;\n        padding: 10px 0;\n        gap: 30px;\n      }\n\n      .lang-item {\n        font-size: 1em;\n        color: #444;\n      }\n\n      .lang-item .dots {\n        font-size: 1.1em;\n        margin-left: 10px;\n      }\n\n      .lang-item .dots .filled {\n        color: #333;\n      }\n\n      .lang-item .dots .empty {\n        color: #ccc;\n      }\n\n      .award-item {\n        font-size: 0.95em;\n        page-break-inside: avoid;\n      }\n\n      .award-item strong {\n        font-size: 1.05em;\n        font-weight: 600;\n        color: #333;\n      }\n\n      .award-item p {\n        margin: 5px 0 0 0;\n        color: #666;\n      }\n\n      @media print {\n        @page {\n          margin-top: 40px;\n        }\n\n        @page :first {\n          margin-top: 0;\n        }\n\n        .resume-container {\n          min-height: 0;\n          margin: 0;\n        }\n      }\n    </style>\n  </head>\n  <body>\n    <div class=\"resume-container\">\n      <header class=\"header-section\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"PhotoInfo") : depth0),{"name":"if","hash":{},"fn":container.program(0, data, 0),"inverse":container.program(1, data, 0),"data":data,"loc":{"start":{"line":228,"column":8},"end":{"line":234,"column":23}}})) != null ? stack1 : "")
    + "\n        <div class=\"contact-info\">\n          <h1>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + "</h1>\n          <p class=\"title\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"JobTitle") : stack1), depth0))
    + "</p>\n\n          <div class=\"contact-details\">\n            <div><i class=\"fas fa-envelope\"></i> "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"Email") : stack1), depth0))
    + "</div>\n            <div><i class=\"fas fa-phone\"></i> "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"PhoneNumber") : stack1), depth0))
    + "</div>\n            <div><i class=\"fas fa-globe\"></i> "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"Website") : stack1), depth0))
    + "</div>\n          </div>\n        </div>\n      </header>\n\n      <main>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"SummaryInfo") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":248,"column":8},"end":{"line":253,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"ExperiencesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":253,"column":16},"end":{"line":273,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"EducationsInfo") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":273,"column":16},"end":{"line":293,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"SkillsInfo") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":293,"column":16},"end":{"line":302,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"LanguagesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":302,"column":16},"end":{"line":311,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"CertificatesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":311,"column":16},"end":{"line":321,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"ReferencesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":321,"column":16},"end":{"line":331,"column":15}}})) != null ? stack1 : "")
    + "      </main>\n    </div>\n  </body>\n</html>\n";
},"useData":true}),
  "vertical": Handlebars.template({"0":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img\n          src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"PhotoInfo") : depth0)) != null ? lookupProperty(stack1,"Base64Image") : stack1), depth0))
    + "\"\n          alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + "\"\n          class=\"profile-pic\"\n        />\n";
},"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <h2 class=\"section-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Summary") : stack1), depth0))
    + "</h2>\n        <p class=\"profile-summary\" style=\"color: #b0c4de\">\n          "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"SummaryInfo") : depth0)) != null ? lookupProperty(stack1,"Text") : stack1), depth0))
    + "\n        </p>\n        ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Languages") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"LanguagesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":233,"column":8},"end":{"line":240,"column":17}}})) != null ? stack1 : "")
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"lang-item\">\n          <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":235,"column":18},"end":{"line":235,"column":27}}}) : helper)))
    + "</strong>\n          <div class=\"dots\">\n            <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Scale") || (depth0 != null ? lookupProperty(depth0,"Scale") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Scale","hash":{},"data":data,"loc":{"start":{"line":237,"column":18},"end":{"line":237,"column":27}}}) : helper)))
    + "</span>\n          </div>\n        </div>\n        ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Certificates") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"CertificatesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":242,"column":8},"end":{"line":248,"column":17}}})) != null ? stack1 : "")
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"award-item\">\n          <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":244,"column":18},"end":{"line":244,"column":27}}}) : helper)))
    + "</strong>\n          <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Issuer") || (depth0 != null ? lookupProperty(depth0,"Issuer") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Issuer","hash":{},"data":data,"loc":{"start":{"line":245,"column":13},"end":{"line":245,"column":23}}}) : helper)))
    + "</p>\n          <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Date") || (depth0 != null ? lookupProperty(depth0,"Date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Date","hash":{},"data":data,"loc":{"start":{"line":246,"column":13},"end":{"line":246,"column":21}}}) : helper)))
    + "</p>\n        </div>\n        ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"ProfessionalExperience") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ExperiencesInfo") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":255,"column":10},"end":{"line":268,"column":19}}})) != null ? stack1 : "")
    + "        </section>\n        ";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"item-container\">\n            <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Company") || (depth0 != null ? lookupProperty(depth0,"Company") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Company","hash":{},"data":data,"loc":{"start":{"line":257,"column":20},"end":{"line":257,"column":31}}}) : helper)))
    + "</strong>\n            <span class=\"duration\"\n              >"
    + alias4(((helper = (helper = lookupProperty(helpers,"StartDate") || (depth0 != null ? lookupProperty(depth0,"StartDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"StartDate","hash":{},"data":data,"loc":{"start":{"line":259,"column":15},"end":{"line":259,"column":28}}}) : helper)))
    + " - "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"IsCurrent") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":259,"column":31},"end":{"line":260,"column":75}}})) != null ? stack1 : "")
    + "</span\n            >\n            <span class=\"location\" style=\"font-weight: 600\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":262,"column":60},"end":{"line":262,"column":69}}}) : helper)))
    + "</span>\n\n            <ul>\n              <li>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Text") || (depth0 != null ? lookupProperty(depth0,"Text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Text","hash":{},"data":data,"loc":{"start":{"line":265,"column":18},"end":{"line":265,"column":26}}}) : helper)))
    + "</li>\n            </ul>\n          </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && lookupProperty(data,"root"))) && lookupProperty(stack1,"Labels"))) && lookupProperty(stack1,"Present")), depth0));
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"EndDate") || (depth0 != null ? lookupProperty(depth0,"EndDate") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"EndDate","hash":{},"data":data,"loc":{"start":{"line":260,"column":57},"end":{"line":260,"column":68}}}) : helper)));
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Education") : stack1), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"EducationsInfo") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":273,"column":10},"end":{"line":285,"column":19}}})) != null ? stack1 : "")
    + "        </section>\n        ";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"item-container\">\n            <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Institute") || (depth0 != null ? lookupProperty(depth0,"Institute") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Institute","hash":{},"data":data,"loc":{"start":{"line":275,"column":20},"end":{"line":275,"column":33}}}) : helper)))
    + "</strong>\n            <span class=\"duration\"\n              >"
    + alias4(((helper = (helper = lookupProperty(helpers,"StartDate") || (depth0 != null ? lookupProperty(depth0,"StartDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"StartDate","hash":{},"data":data,"loc":{"start":{"line":277,"column":15},"end":{"line":277,"column":28}}}) : helper)))
    + " - "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"IsCurrent") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":277,"column":31},"end":{"line":278,"column":75}}})) != null ? stack1 : "")
    + "</span\n            >\n            <span class=\"location\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":280,"column":35},"end":{"line":280,"column":44}}}) : helper)))
    + "</span>\n            <ul>\n              <li>"
    + alias4(container.lambda(((stack1 = ((stack1 = (data && lookupProperty(data,"root"))) && lookupProperty(stack1,"Labels"))) && lookupProperty(stack1,"Gpa")), depth0))
    + ": "
    + alias4(((helper = (helper = lookupProperty(helpers,"Gpa") || (depth0 != null ? lookupProperty(depth0,"Gpa") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Gpa","hash":{},"data":data,"loc":{"start":{"line":282,"column":40},"end":{"line":282,"column":47}}}) : helper)))
    + "</li>\n            </ul>\n          </div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n        <section class=\"section\">\n          <h2 class=\"section-title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"Labels") : depth0)) != null ? lookupProperty(stack1,"Skills") : stack1), depth0))
    + "</h2>\n          <ul class=\"skills-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"SkillsInfo") : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":291,"column":12},"end":{"line":293,"column":21}}})) != null ? stack1 : "")
    + "          </ul>\n        </section>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <li>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":292,"column":16},"end":{"line":292,"column":25}}}) : helper)))
    + "</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<html lang=\""
    + alias2(((helper = (helper = lookupProperty(helpers,"Lang") || (depth0 != null ? lookupProperty(depth0,"Lang") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"Lang","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":20}}}) : helper)))
    + "\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + " - Özgeçmiş</title>\n    <link\n      rel=\"stylesheet\"\n      href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\"\n    />\n    <style>\n      @page {\n        size: A4;\n        margin: 0;\n      }\n\n      body::before {\n        content: \"\";\n        position: fixed;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        width: 330px;\n        background-color: #1a374c;\n        z-index: -1;\n      }\n\n      body {\n        font-family: Arial, sans-serif;\n        background-color: #fff;\n        margin: 0;\n        padding: 0;\n        position: relative;\n      }\n\n      .resume-container {\n        max-width: 900px;\n        margin: 0 auto;\n        display: flex;\n        align-items: flex-start;\n      }\n\n      .sidebar {\n        flex: 0 0 280px;\n        color: #fff;\n        padding: 30px 25px;\n        -webkit-box-decoration-break: clone;\n        box-decoration-break: clone;\n      }\n\n      .sidebar h1 {\n        font-size: 1.8em;\n        margin: 0 0 5px 0;\n        font-weight: 700;\n      }\n\n      .sidebar .title {\n        font-size: 1.2em;\n        font-weight: 400;\n        margin: 0 0 20px 0;\n        color: #b0c4de;\n      }\n\n      .profile-pic {\n        width: 130px;\n        height: 130px;\n        border-radius: 50%;\n        object-fit: cover;\n        margin: 20px 0 30px 0;\n        border: 4px solid #fff;\n      }\n\n      .contact-details {\n        font-size: 0.9em;\n        margin-bottom: 30px;\n      }\n\n      .contact-details div {\n        display: flex;\n        align-items: center;\n        margin-bottom: 8px;\n        word-wrap: break-word;\n      }\n\n      .contact-details i {\n        margin-right: 10px;\n        color: #6a8ba8;\n        width: 15px;\n        text-align: center;\n      }\n\n      .fas {\n        font-family: \"Font Awesome 6 Free\";\n        font-weight: 900;\n        font-style: normal;\n      }\n\n      .sidebar .section-title {\n        font-size: 1.2em;\n        font-weight: 600;\n        text-transform: uppercase;\n        margin: 20px 0 10px 0;\n        color: #fff;\n        border-bottom: 2px solid #557085;\n        padding-bottom: 5px;\n        page-break-after: avoid;\n      }\n\n      .lang-item,\n      .award-item {\n        margin-bottom: 15px;\n        font-size: 0.9em;\n        page-break-inside: avoid;\n      }\n\n      .lang-item strong,\n      .award-item strong {\n        display: block;\n        font-weight: 700;\n      }\n\n      .lang-item p,\n      .award-item p {\n        margin: 2px 0;\n        color: #b0c4de;\n      }\n\n      .lang-item .dots {\n        font-size: 1.2em;\n      }\n\n      .main-content {\n        flex: 1;\n        padding: 30px 30px 30px 40px;\n        -webkit-box-decoration-break: clone;\n        box-decoration-break: clone;\n      }\n\n      .main-content .section-title {\n        font-size: 1.1em;\n        font-weight: 600;\n        text-transform: uppercase;\n        color: #333;\n        margin: 25px 0 15px 0;\n        padding-bottom: 5px;\n        border-bottom: 2px solid #ddd;\n        page-break-after: avoid;\n      }\n\n      .profile-summary {\n        font-size: 0.95em;\n        line-height: 1.6;\n        color: #555;\n      }\n\n      .item-container {\n        margin-bottom: 20px;\n        page-break-inside: avoid;\n      }\n\n      .item-container strong {\n        font-size: 1em;\n        font-weight: 700;\n        color: #222;\n        display: block;\n        margin-bottom: 2px;\n      }\n\n      .item-container .duration {\n        font-style: italic;\n        font-size: 0.9em;\n        color: #666;\n        display: block;\n        margin-bottom: 5px;\n      }\n\n      .item-container .location {\n        font-size: 0.9em;\n        color: #888;\n        display: block;\n        margin-bottom: 10px;\n      }\n\n      .item-container ul {\n        padding-left: 20px;\n        font-size: 0.9em;\n        color: #555;\n        line-height: 1.5;\n        margin-top: 5px;\n      }\n\n      .item-container ul li {\n        margin-bottom: 4px;\n      }\n\n      .skills-list {\n        list-style-type: disc;\n        padding-left: 20px;\n        font-size: 0.9em;\n        color: #555;\n        column-count: 2;\n        column-gap: 30px;\n      }\n\n    </style>\n  </head>\n  <body>\n    <div class=\"resume-container\">\n      <div class=\"sidebar\">\n        <h1>"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"FullName") : stack1), depth0))
    + "</h1>\n        <p class=\"title\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"JobTitle") : stack1), depth0))
    + "</p>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"PhotoInfo") : depth0),{"name":"if","hash":{},"fn":container.program(0, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":212,"column":8},"end":{"line":218,"column":15}}})) != null ? stack1 : "")
    + "\n        <div class=\"contact-details\">\n          <div><i class=\"fas fa-envelope\"></i> "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"Email") : stack1), depth0))
    + "</div>\n          <div><i class=\"fas fa-phone\"></i> "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"PhoneNumber") : stack1), depth0))
    + "</div>\n          <div><i class=\"fas fa-globe\"></i> "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"PersonalInfo") : depth0)) != null ? lookupProperty(stack1,"Website") : stack1), depth0))
    + "</div>\n        </div>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"SummaryInfo") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":226,"column":8},"end":{"line":231,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"LanguagesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":231,"column":16},"end":{"line":240,"column":25}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"CertificatesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":240,"column":26},"end":{"line":248,"column":25}}})) != null ? stack1 : "")
    + "\n      </div>\n\n      <div class=\"main-content\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"ExperiencesInfo") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":252,"column":8},"end":{"line":270,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"EducationsInfo") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":270,"column":16},"end":{"line":287,"column":15}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"SkillsInfo") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":287,"column":16},"end":{"line":296,"column":15}}})) != null ? stack1 : "")
    + "      </div>\n    </div>\n  </body>\n</html>\n";
},"useData":true}),
};
