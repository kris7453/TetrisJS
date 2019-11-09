var Tetris = Tetris || {};

Tetris.Menu = function () {
    this.menuStep = 0;
    this.currentOption = 0;
    this.menuOption = [];

    this.menuOption[0] = 3;
    this.menuOption[1] = 10;
    this.menuOption[2] = 5;

    this.hintDisplay = false;

    this.startLevel;

    this.pointer = { x: 150, y: 236, image: document.getElementById("pointer") };
    this.splashscreenImage = document.getElementById("splashscreen");
    this.selectImage = document.getElementById("game");
    this.textStart = 99;

    Tetris.Control.music.titleTheme.currentTime = 0.0;
    Tetris.Control.music.titleTheme.play();
}

Tetris.Menu.prototype.splashScreen = function () {
    this.textStart++;

    if (this.textStart == 100) {
        Tetris.ctx.clearRect(0, 0, 600, 560);
        Tetris.ctx.drawImage(this.splashscreenImage, 0, 0, 600, 560, 0, 0, 600, 560);
        this.textStart = 0;
    }
    else if (this.textStart >= 50) {
        Tetris.ctx.fillStyle = "white";
        Tetris.ctx.font = "26px Arial";
        Tetris.ctx.fillText("Press ENTER to Start", 175, 480);
    }

    if (!Tetris.Control.enterPrev && Tetris.Control.enter) {
        Tetris.Control.enterPrev = false;
        Tetris.Control.music.titleTheme.pause();
        
        Tetris.Control.music.menuChose.play();
        Tetris.canvas.style.backgroundImage = "url('images/menuBackground.png')";
        Tetris.ctx.clearRect(0, 0, 600, 560);
        //draw image of game select
        Tetris.ctx.drawImage(this.selectImage, 0, 0, this.selectImage.width, this.selectImage.height,
                                150, 200, this.selectImage.width, this.selectImage.height);
        //draw select pointer
        Tetris.ctx.drawImage(this.pointer.image, 0, 0, this.pointer.image.width, this.pointer.image.height,
                                this.pointer.x, this.pointer.y, this.pointer.image.width, this.pointer.image.height);

        clearInterval(Tetris.Control.loop);
        setTimeout(function () {
            Tetris.Control.loop = setInterval(function () { Tetris.Control.menu.chooseGame(); }, 16);
        }, 500);
    }

    if (Tetris.Control.enterPrev && !Tetris.Control.enter)
        Tetris.Control.enterPrev = false;
};

Tetris.Menu.prototype.chooseGame = function ()
{
    Tetris.Control.checkMenuEvents();

    if (Tetris.Control.enter)
    {
        Tetris.Control.music.menuChose.play();
        Tetris.ctx.clearRect(0, 0, 600, 560);

        switch ( this.currentOption )
        {
            case 0: this.menuStep++;
                    this.currentOption = 0;
                    //draw image of level select
                    //Tetris.ctx.clearRect(150, 200, this.selectImage.width, this.selectImage.height);
                    this.selectImage = document.getElementById("level");
                    Tetris.ctx.drawImage(   this.selectImage, 0, 0, this.selectImage.width, this.selectImage.height,
                                            150, 200, this.selectImage.width, this.selectImage.height);
                    //draw select pointer
                    Tetris.ctx.drawImage(this.pointer.image, 0, 0, this.pointer.image.width, this.pointer.image.height,
                                            this.pointer.x, this.pointer.y, this.pointer.image.width, this.pointer.image.height);

                    clearInterval(Tetris.Control.loop);
                    setTimeout(function ()
                    { 
                        Tetris.Control.loop = setInterval(function () { Tetris.Control.menu.chooseLevel(); }, 16);
                    }, 500);
                    break;

            case 1: Tetris.canvas.style.backgroundImage = "url('images/control.png')";
                    clearInterval(Tetris.Control.loop);
                    setTimeout(function () {
                        Tetris.Control.loop = setInterval(function () { Tetris.Control.menu.displayHint(); }, 16);
                    }, 500);
                    break;

            case 2: Tetris.canvas.style.backgroundImage = "url('images/instruction.png')";
                    clearInterval(Tetris.Control.loop);
                    setTimeout(function () {
                        Tetris.Control.loop = setInterval(function () { Tetris.Control.menu.displayHint(); }, 16);
                    }, 500);
                    break;
        }
    }
};

Tetris.Menu.prototype.displayHint = function()
{
    if( Tetris.Control.enter)
    {
        this.currentOption = 0;
        Tetris.canvas.style.backgroundImage = "url('images/menuBackground.png')";
        //draw image of game select
        Tetris.ctx.drawImage(this.selectImage, 0, 0, this.selectImage.width, this.selectImage.height,
                            150, 200, this.selectImage.width, this.selectImage.height);
        //draw select pointer
        Tetris.ctx.drawImage(this.pointer.image, 0, 0, this.pointer.image.width, this.pointer.image.height,
                            this.pointer.x, this.pointer.y, this.pointer.image.width, this.pointer.image.height);

        clearInterval(Tetris.Control.loop);
	    setTimeout(function ()
	        {
	        Tetris.Control.loop = setInterval(function () {
            Tetris.Control.menu.chooseGame(); }, 16);
	        }, 500);
    }
}

Tetris.Menu.prototype.chooseLevel = function ()
{
    Tetris.Control.checkMenuEvents();

    if (Tetris.Control.enter)
    {
        Tetris.Control.music.menuChose.play();
        this.menuStep++;
        this.startLevel = this.currentOption;
        this.currentOption = 0;
        Tetris.ctx.clearRect(0, 0, 600, 560);
        //draw image of music select
        Tetris.ctx.clearRect(150, 200, this.selectImage.width, this.selectImage.height);
        this.selectImage = document.getElementById("music");
        Tetris.ctx.drawImage(this.selectImage, 0, 0, this.selectImage.width, this.selectImage.height,
                                150, 200, this.selectImage.width, this.selectImage.height);
        //draw select pointer
        Tetris.ctx.drawImage(this.pointer.image, 0, 0, this.pointer.image.width, this.pointer.image.height,
                                this.pointer.x, this.pointer.y, this.pointer.image.width, this.pointer.image.height);

        clearInterval(Tetris.Control.loop);
        setTimeout(function ()
        { 
            Tetris.Control.loop = setInterval(function () { Tetris.Control.menu.chooseMusic(); }, 16);
        }, 500);
    }

};

Tetris.Menu.prototype.chooseMusic = function ()
{
    if (typeof this.chooseMusic.tempMusic == "undefined")
    {
        this.chooseMusic.tempMusic = null;
        this.chooseMusic.changedOption = false;
    }

    Tetris.Control.checkMenuEvents();
    if (this.chooseMusic.changedOption)
    {
        if (this.chooseMusic.tempMusic != null)
            this.chooseMusic.tempMusic.pause();

        switch (this.currentOption)
        {
            case 0: this.chooseMusic.tempMusic = null;
                    break;

            case 1: this.chooseMusic.tempMusic = new Audio("sounds/Loginska.m4a");
                    break;

            case 2: this.chooseMusic.tempMusic = new Audio("sounds/Bradinsky.m4a");
                    break;

            case 3: this.chooseMusic.tempMusic = new Audio("sounds/Karinka.m4a");
                    break;

            case 4: this.chooseMusic.tempMusic = new Audio("sounds/Troika.m4a");
                    break;
        }

        if (this.chooseMusic.tempMusic != null)
        {
            this.chooseMusic.tempMusic.volume = 0.5;
            this.chooseMusic.tempMusic.loop = true;
            this.chooseMusic.tempMusic.play();
        }
        this.chooseMusic.changedOption = false;
    }


    if (Tetris.Control.enter)
    {
        if (this.chooseMusic.tempMusic != null)
            this.chooseMusic.tempMusic.pause();
        Tetris.Control.music.menuChose.play();
        if ( this.currentOption > 0 )
            Tetris.Control.music.loadMusic( this.currentOption );
        clearInterval(Tetris.Control.loop);
        setTimeout(function ()
        {
            Tetris.Control.loop = setInterval(function () { Tetris.Control.menu.gameStart(); }, 16);
        }, 500);
    }
};

Tetris.Menu.prototype.gameStart = function ()
{
    Tetris.canvas.style.backgroundImage = "url('images/background.png')";
    Tetris.ctx.drawImage(document.getElementById("background"), 0, 0, 600, 560, 0, 0, 600, 560);

    Tetris.Control.game = new Tetris.Game( Tetris.Control.checkIngameEvents, this.startLevel );
    clearInterval(Tetris.Control.loop);
    Tetris.Control.loop = setInterval( Tetris.Control.singlePlayer, 16 );
};
