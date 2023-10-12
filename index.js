const pupputeer = require('puppeteer');
const fs = require('fs');

async function traveryScrap (){
  const browser = await pupputeer.launch({
  headless: 'new',
  });
  const page = await browser.newPage();
  await page.goto('https://www.traversymedia.com/');



  //You can take screenshot  - cool indeed!
  //await page.screenshot( { path: 'example.png', fullPage: true } );
  //You can save as a pdf  - flubergusyed!
  //await page.pdf( { path: 'example.pdf', format: 'A4' } );

  //get all page content
  //const html = await page.content();
  //get page title
  //const title = await page.evaluate(()=>document.title);
  //get all page text (inner)
  //const text = await page.evaluate(()=> document.body.innerText);
  //get all page links
  //const links = await page.evaluate(()=> Array.from(document.querySelectorAll('a'), (e) => e.href));
  //#1 way to do it!
//   const courses = await page.evaluate(() =>
//    Array.from(document.querySelectorAll('#cscourses .card'), (e) => ({
//           title: e.querySelector('.card-body h3').innerText,
//           level: e.querySelector('.card-body .level').innerText,
//           url: e.querySelector('.card-footer a').href,
//           coursePhoto: e.querySelector('img').src,
//   }))
//   );

  //#2 way to do it!
  const courses = await page.$$eval('#cscourses .card', (elements) => elements.map(e =>({
          title: e.querySelector('.card-body h3').innerText,
          level: e.querySelector('.card-body .level').innerText,
          url: e.querySelector('.card-footer a').href,
          coursePhoto: e.querySelector('img').src,   
  })));
 console.log(courses);
 // save data as json file
 fs.writeFile('traversy.json', JSON.stringify(courses), (err)=> {
          if(err) return console.log(err);
          console.log('file saved as json')
 })








  await browser.close();
}

traveryScrap ();