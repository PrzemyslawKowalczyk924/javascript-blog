'use strict';

/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
 */

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  //console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
    console.log(activeLinks);
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
    console.log(activeArticles);
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
  targetArticle.classList.add('active');
}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  /*remove contents of titleList*/
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';
  
  console.log(titleList);

  /*for each article*/
  const articles = document.querySelectorAll('.post');

  /*find all articles and save them to variable: articles*/
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    console.log('ArticleId to: ' + articleId)
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle to :' + articleTitle);
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('html link to: ' + linkHTML);
    //titleList.insertAdjacentHTML('beforebegin', linkHTML);
    console.log('titleList to jest: ' + titleList)
    console.log('To html: ' + html);
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  /*get the article id*/
  /*find the title element*/
  /*get the title from title element*/
  /*create html of the link*/
  /*insert link into titleList*/
  const links = document.querySelectorAll('.titles a');
  console.log('Check const links: ' + links);
  for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

}

generateTitleLinks();