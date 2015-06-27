// ==UserScript==
// @name        Nacion.com un poco menos peor.
// @namespace   https://github.com/leopic/tampermonkey
// @version     0.4
// @description paywall, costa rica, nacion.com, la nacion, nacion, financiero, nazion
// @match       http://www.nacion.com/
// @match       http://www.nacion.com/*/*
// @match       http://www.nacion.com/**
// @match       http://www.elfinancierocr.com/**
// @copyright  2014+, Leo Picado
// ==/UserScript==

// http://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
(function() {
    var css = '',
        elToHide = ['.md-wgt-twitter', '.gna-corp-onsite-bar', '.ob_org_header', '.md-fxrate .source', '.cp-tools.md.clr', '.onsite-bar', '#comentarios', '.social-links', '#nav-top', '.pg-bkn-trail-id', '.ob_what', '.md-breakingnews-wrapper', '.rg-ad', '.md-adn_radio', '*[id*="eplAdDiv"]', '*[id*="creative_"]', '*[id*="ns_ad"]', '#comments', '#footer', '#header .onsite-bar', '#LNA_background', '#LNA_contenidoTotal', '.LNA_background_paywall', '#header .masthead', '#paywall-notification', '#nacion-login-bar', '#LNA_paywall_modal', '.pg-aux #pageTools', '#heading #pageToolbar', '.gn_footer'],
        fontsToFix = ['.mce-body em.mce, .mce-body em.mce .mce, .mce-body i.mce, .mce-body i.mce .mce', '.main-search .search-field', '.md-item-eco-currency-rates .item', '.md-scr-news .hed .kicker', '.md-scr-news .hed', '.md-print-edition .lst', '.showlist-item .hed', '.md-block-special .slice-caption', '.md-block-special .slice-brief', '.md-blogs .lst', '.nws .kicker', '.pane-jigsaw .mtx .kicker', '.pane-jigsaw .mtx .hed', '.md-topmost .lst .lnk', '.md .read-more .lnk', '.sk-md1 .hd .title', '.md-columnist-content-title', '.md-columnist-content-author', '.md-editorial .brief', '.md-editorial .bd', '.md-news-today .headline', '.cp-relations .rel-entry .rel', '.cp-reltags .tag', '.pg-story .pg-bkn-nutfold li, .pg-story .pg-bkn-nutfold p', '.mce-body b.mce, .mce-body b.mce .mce, .mce-body strong.mce, .mce-body strong.mce .mce', '.lst-relinfo', '.nws .brief', '.nws .dateline', '.nws .headline','.cp-relations .rel-entry', '.pg-story .pg-bkn-dateline','.md-news-latest .lst', '.dateline', '.md-news-topic .lst .lnk', '.mce-body .mce', '.mce-body p.mce', '.pg-story .pg-bkn-headline', '.footnote', '.md-news-topic .brief .lnk .dest', '.ob_org_header', '.AR_1 .strip-rec-link-title']
    
    css += elToHide.join(',') + '{ display: none!important; }';
    css += fontsToFix.join(',') + '{font-family: sans-serif; font-weight: 400;}';
    css += '.mce-body em.mce, .mce-body em.mce .mce, .mce-body i.mce, .mce-body i.mce .mce {font-style: italic;}';
    css += '.footnote {color: #999; border: none; font-size: 14px;}';
    css += '.AR_1.ob_strip_container {border: none!important;}';
    css += '.md-news-latest .lst {height: 465px;}';
    css += '.mce-body b.mce, .mce-body b.mce .mce, .mce-body strong.mce, .mce-body strong.mce .mce {font-weight:600!important}';
    css += '.mce-body a.mce {font-weight: bold!important;}';
    css += '.cp-reltags .tag {padding: 5px;}';
    css += '.pg-story .pg-head {border: none; padding-top:0;}';
    css += 'body #main{margin-top:0!important}';
    css += '.md-news-topic.border-bottom, .md-news-topic {border-width: 1px;}';
    css += '#heading .g-faux { background: none!important; padding-left: 0!important;} ' + '#header.rg-header { border: none!important; margin-top: 5px!important; z-index: 999999; position: relative; } ' + '#header .nav-bar { position: fixed!important; } ' + '#main { margin-top: 55px!important; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    var checkAndRemoveElem = function(id, interval) {
        var modal = document.getElementById(id);

        if (modal) {
            modal.parentElement.parentElement.remove();
            clearInterval(interval);
        }
    };

    var firstPayWall = setInterval(checkAndRemoveElem, 5, 'LNA_paywall_modal', firstPayWall);
    var secondPayWall = setInterval(checkAndRemoveElem, 5, 'paywall-cookie', secondPayWall);
    
    // Cookies
    // http://stackoverflow.com/questions/2144386/javascript-delete-cookie
    function createCookie(name,value,days) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    // Add link back to home
    $('<li class="nav-item main thm1 nav-item-first"><a class="nav-item-inner lnk" href="/"><span class="tx">Home</span></a></li>').prependTo('.nav-holder .nav-item:first-child');
    $('nav-item main.thm1.nav-item-first').removeClass('nav-item-first');

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    
    eraseCookie('xp-allowed');
    eraseCookie('xp-pagesCount');
    
})();

