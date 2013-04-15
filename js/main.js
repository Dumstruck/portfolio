!function() { 

  "use strict";

  
  var sections = ['about', 'portfolio', 'contact'];

  //This would all normally be obfuscated and crushed via uglifyjs or jscrush

  // I don't like to use JQuery if all I need is a 'ready' function
  // This will do nicely instead
  if(document.readyState == "interactive") {
    init();
  }
  else
  {
    document.onreadystatechange = function () {
      if(document.readyState == "interactive") {
        init();
      }
    }
  }

  function init()
  {
    scrollIntoView();

    sections.forEach(function(section)
    {
      document.getElementById('a-'+section)
      .addEventListener('click', function()
      {
        location.hash = '#/'+section; // this is needed because the hash isn't set by some browsers until after the click event bubbles
        scrollIntoView();
      });
    });

    document.addEventListener('scroll', onScroll);

  }

  function scrollIntoView()
  {
    var hash = location.hash.slice(2); 
    if(!hash.length) return;

    updateLinks();
    document.getElementById(location.hash.slice(2)).scrollIntoView();
  }

  function updateLinks()
  {
    for(var i = 0; i < sections.length; i++)
    {
      document.getElementById('a-'+sections[i]).className = '';
    }

    if(location.hash.length)
      document.getElementById('a-'+location.hash.slice(2)).className = 'active';
  }

  function onScroll()
  {
    var hash = location.hash.slice(2); 

    // cross browser scroll position
    var docScrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    // get viewport height
    var elem = (document.compatMode === "CSS1Compat") ?  document.documentElement : document.body;
    var viewportHeight = elem.clientHeight;

    var portfolioScrollPos = getScrollPosition('portfolio');
    var aboutScrollPos = getScrollPosition('about');
  
    if(docScrollY + viewportHeight > getDocHeight() - 50)
    {
      console.log('contact');
      if(hash != 'contact')
      {
        location.hash = '#/contact';
        updateLinks();
      }
    }
    else
    if(getScrollPosition('portfolio') < viewportHeight/2)
    {
        if(hash !== 'portfolio')
        {
          location.hash = '#/portfolio';
          updateLinks();
        }
    } 
    else
    if((docScrollY < viewportHeight/2 || getScrollPosition('about') < 0) && docScrollY !== 0)
    {
      if(hash !== 'about')
      {
        location.hash = '#/about';
        updateLinks();
      }
    }
    else if(docScrollY == 0)
    {
      location.hash = '';
      updateLinks();
    }

  }
  
  function getDocHeight() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  function getScrollPosition(target)
  {
    return document.getElementById(target).getBoundingClientRect().top;
  }

}();
