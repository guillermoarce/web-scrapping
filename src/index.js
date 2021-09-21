const puppeteer = require('puppeteer');

( async () => {
    const browser = await puppeteer.launch({ 
        // headless: false, 
        // slowMo: 300
    });
    const page = await browser.newPage();
    //ir a la pagina web
    await page.goto('https://nextviaje.vercel.app/');
    //obtener los links <a> que se encuentran dentro de una class (FilaCasas__cartas)
    const urls = await page.evaluate(() => 
        Array.from(document.querySelectorAll(".FilaCasas__cartas a"), (nodo) => nodo.href
        )
    );

    console.log(urls);

    /**
     * Visitar paginas
     */
    await page.goto(urls[0]);
    const detallesDeLaCasa = await page.evaluate( () => {    
        //obtencion de las imagenes que posee una publicación en particular
        const imagenes = [
            ...document.querySelectorAll(".CasaVista__fotos img"),
          ].map((img) => img.src);

        //obtencion del texto del titulo que se encuentra en una class
        const titulo = document.querySelector('.CasaVista__titulo').innerText;

        //obtención del texto de la ubicación que no se encuentra en una class pero está dentro de una "padre"
        const ubicacion = document.querySelector('.CasaVista__titulo + div').innerText;

        return {
            imagenes,
            titulo,
            ubicacion
        };
    });

    console.log(detallesDeLaCasa);
    
})();