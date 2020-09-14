'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

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

  /*find all articles and save them to variable: articles*/
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  let html = '';

  /*for each article*/
  for (let article of articles) {
    /*get the article id*/
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /*find the title element*/
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /*create html of the link*/
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    //titleList.insertAdjacentHTML('beforebegin', linkHTML);
    /*insert link into titleList*/
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

}

generateTitleLinks();

 /*get the title from title element*/
 const links = document.querySelectorAll('.titles a');
 console.log(links);
 for (let link of links) {
   link.addEventListener('click', titleClickHandler);
 }

 