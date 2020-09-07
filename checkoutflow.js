import {parseHTML} from "k6/html";
import http from 'k6/http';
import { check, group, sleep } from 'k6';


export function testLogin(params) {
  let data = params || { username: 'mgewiotrfgaocxcegz@etochq.com', password: 'mgewiotrfgaocxcegz@etochq.com' };
  http.post('https://nutrabay.com/my-account/', data);
}

export default function () {
  testLogin();

  let res = http.get("https://nutrabay.com/product/nutrabay-gold-100-whey-protein-isolate/");
  check(res, {
    "is status 200": (r) => r.status === 200
  });


  // Now, click on the weight 
  //res = res.clickLink({ selector: 'a:nth-child(1)' });

  let doc = res.html();
  doc.find("link").toArray().forEach(function (item) {
    console.log(item.attr("href"));
  });


  const content = `
  
  <select id="pa_flavour" class="" name="attribute_pa_flavour" data-attribute_name="attribute_pa_flavour" data-show_option_none="yes">
  <option value="">Choose an option</option>
  <option value="rich-chocolate-creme" class="attached enabled">Rich Chocolate Creme</option>
  <option value="strawberry-milkshake" class="attached enabled">Strawberry Milkshake</option>
  <option value="vanilla-ice-cream" class="attached enabled">Vanilla Ice Cream</option>
  </select>
  `;

  const newFunctiondoc = parseHTML(content);

  console.log(newFunction(doc)('#pa_flavour option[strawberry-milkshake]').val());

  check(res, {
    "is status 200": (r) => r.status === 200,
    "Flavour is selected": (r) => r.status ===200
  });

  //res = res.clickLink({ selector: 'a:nth-child(1)' });
  


}

function newFunction(doc) {
  return doc.find;
}




