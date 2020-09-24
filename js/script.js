'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
};

const opt = {
  ArticleSelector: '.post',
  TitleSelector: '.post-title',
  TitleListSelector: '.titles',
  ArticleTagsSelector: '.post-tags .list',
  ArticleAuthorSelector: '.post-author',
  TagsListSelector: '.tags.list',
  CloudClassCount: 5,
  CloudClassPrefix: 'tag-size-',
  AuthorsListSelector: '.authors'
};

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

function generateTitleLinks(customSelector = '') {
  /*remove contents of titleList*/
  const titleList = document.querySelector(opt.TitleListSelector);
  console.log('customSelector: ' + customSelector);
  titleList.innerHTML = '';
  console.log(titleList);

  /*find all articles and save them to variable: articles*/
  const articles = document.querySelectorAll(opt.ArticleSelector + customSelector);
  console.log('articles with customSelector: ' + articles);

  let html = '';

  /*for each article*/
  for (let article of articles) {
    /*get the article id*/
    const articleId = article.getAttribute('id');
    console.log(articleId);
    /*find the title element*/
    const articleTitle = article.querySelector(opt.TitleSelector).innerHTML;
    console.log(articleTitle);
    /*create html of the link*/
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);
    //titleList.insertAdjacentHTML('beforebegin', linkHTML);
    /*insert link into titleList*/
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  console.log('params:', params);
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.CloudClassCount - 1) + 1);
  return classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.ArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsList = article.querySelector(opt.ArticleTagsSelector);
    console.log('tagsList: ' + tagsList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags: ' + articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      const linkHTMLData = {id: 'tag-' + tag, title: tag};
      const linkHTML = templates.articleLink(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('html: ' + html);
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
        console.log(allTags);
      } else {
        allTags[tag]++;
        console.log(allTags);
      }
      /* END LOOP: for each tag */

      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector('.tags');

      const tagsParams = calculateTagsParams(allTags);
      console.log('tagsParams:', tagsParams);
      /* [NEW] create variable for all links HTML code */
      let allTagsHTML = '';
      console.log(allTagsHTML);
      /* [NEW] START LOOP: for each tag in allTags: */
      for (let tag in allTags) {
        console.log(tag);
        /* [NEW] generate code of a link and add it to allTagsHTML */
        //allTagsHTML += '<li><a class="tag-size-" href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')' + '</a></li>';
        const tagLinkHTML = '<li>' + '<a class="' + opt.CloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '"'
          + 'href="#tag-' + tag + '"' + '>' + tag + '</a>' + '</li>';
        //+ '(' + allTags[tag] + ')'
        allTagsHTML += tagLinkHTML;
        //optCloudClassPrefix
        console.log('allTagsHTML', allTagsHTML);
        console.log('tagLinkHTML:', tagLinkHTML);
      }
      /* [NEW] END LOOP: for each tag in allTags: */

      /*[NEW] add HTML from allTagsHTML to tagList */
      tagList.innerHTML = allTagsHTML;

    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
    console.log('tagsList.innerHTML ' + tagsList.innerHTML);

    /* END LOOP: for every article: */
  }
  console.log('tablica: ' + allTags);
}

generateTags();

const tagClickHandler = function (event) {
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
  console.log('tag: ' + tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTagLinks) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  let foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('foundTagLinks: ' + foundTagLinks);
  /* START LOOP: for each found tag link */
  for (let foundTagLink of foundTagLinks) {
    /* add class active */
    foundTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags .list a, .list.tags a');
  console.log('links: ' + links);
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /*[NEW] add object for all authors*/
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.ArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const authorList = article.querySelector(opt.ArticleAuthorSelector);
    console.log('authorList: ' + authorList);
    /* make html variable with empty string */
    let html = '';
    /* get author from post-author class */
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor: ' + articleAuthor);
    /* generate HTML of the link */
    //const authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    const linkHTMLData = {id: 'author-' + articleAuthor, title: articleAuthor};
    const linkHTML = templates.articleLink(linkHTMLData);
    /* add generated code to html variable */
    html = html + linkHTML;
    console.log('html: ' + html);

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[articleAuthor]) {
      /* [NEW] add tag to allAuthors object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    console.log('allAuthors:', allAuthors);

    /* [NEW] find list of tags in right column */
    const listofAuthors = document.querySelector(opt.AuthorsListSelector);
    /* [NEW] create variable for all links HTML code */

    /* [NEW] START LOOP: for each author in allAuthors: */
    let allAuthorsHTML = '';

    for (let author in allAuthors) {
      console.log(allAuthorsHTML);
      console.log(author);
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + '(' + allAuthors[author] + ')' + '</a></li>';
      console.log('allTagsHTML', allAuthorsHTML);
      allAuthorsHTML += authorLinkHTML;
    }
    /*[NEW] Add insert HTML of all authors to right barside*/
    listofAuthors.innerHTML = allAuthorsHTML;

    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML = html;
    console.log('authorList.innerHtml ' + authorList.innerHTML);
    /* END LOOP: for every article: */
  }
}

generateAuthors();

const authorClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);
  /* START LOOP: for each active tag link */
  for (let activeAuthorList of activeAuthorLinks) {
    /* remove class active */
    activeAuthorList.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  let foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('foundTagLinks: ' + foundAuthorLinks);
  /* START LOOP: for each found tag link */
  for (let foundAuthorLink of foundAuthorLinks) {
    /* add class active */
    foundAuthorLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
};

function addClickListenersToAuthors() {
  /* find all links to tags */
  const links = document.querySelectorAll('.list.authors a, .post-author a');
  console.log('links: ' + links);
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();

