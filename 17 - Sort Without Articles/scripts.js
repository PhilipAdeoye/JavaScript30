(function () {

    const bands = [
        'The Plot in You', 
        'The Devil Wears Prada', 
        'Pierce the Veil', 
        'Norma Jean', 
        'The Bled', 
        'Say Anything', 
        'The Midway State', 
        'We Came as Romans', 
        'Counterparts', 
        'Oh, Sleeper', 
        'A Skylit Drive', 
        'Anywhere But Here', 
        'An Old Dog'
    ];

    const articles = ['The ', 'A ', 'An '];

    // I'm clearly not a fan of regex
    const bandsWithArticles = bands.map(band => {

        let article = '';
        let bandNameWithoutArticle = band;
        for (const artcl of articles) {
            if (band.startsWith(artcl)) {
                article = artcl;
                bandNameWithoutArticle = bandNameWithoutArticle.replace(artcl, '');
                break;
            }
        }
        return { bandNameWithoutArticle, article };
    });

    const sortedBands = bandsWithArticles
        .sort((a, b) => a.bandNameWithoutArticle < b.bandNameWithoutArticle ? -1 : 1)
        .map(x => `${x.article}${x.bandNameWithoutArticle}`);

    console.table(bandsWithArticles);
    console.table(sortedBands);

    const bandList = document.querySelector('#bands');
    bandList.innerHTML = sortedBands.map(b => `<li>${b}</li>`).join("");

})();