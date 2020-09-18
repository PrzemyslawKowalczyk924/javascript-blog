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
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

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

function generateTags(customSelector = '') {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('articles: ' + articles);
  console.log('customSelector: ' + customSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log('tagsList: ' + tagsList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);
      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag +'">'+ tag +'</a></li>';
      /* add generated code to html variable */
      html = html + tagHTML;
      console.log('Tu jest zagwostka!!! ' + html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
    console.log('was is das?! ' + tagsList.innerHTML);

    /* END LOOP: for every article: */
  }

}

generateTags();

const tagClickHandler = function (event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTagLinks = tag.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTagLinks) {
    /* remove class active */
    activeTag.classList.remove('a[href="' + href + '"]');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */
  {
    /* add class active */

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

tagClickHandler();
addClickListenersToTags();
