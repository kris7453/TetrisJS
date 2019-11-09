var Tetris = Tetris || {};

Tetris.Music = function()
{
    this.music = null;

    this.titleTheme = new Audio("sounds/titleTheme.m4a");
    this.changeOption = new Audio("sounds/changeOption.m4a");
    this.menuChose = new Audio("sounds/menuChose.m4a");
    this.blockHit = new Audio("sounds/hit.m4a");
    this.lineClear = new Audio("sounds/lineClear.m4a");
    this.levelUp = new Audio("sounds/levelUp.m4a");
    this.gameOver = new Audio("sounds/gameOver.m4a");

    this.titleTheme.loop = true;
};

Tetris.Music.prototype.loadMusic = function (musicNumber)
{
    switch ( musicNumber )
    {
        case 1: this.music = new Audio("sounds/Loginska.m4a");
            break;

        case 2: this.music = new Audio("sounds/Bradinsky.m4a");
            break;

        case 3: this.music = new Audio("sounds/Karinka.m4a");
            break;

        case 4: this.music = new Audio("sounds/Troika.m4a");
            break;
    }
    this.music.volume = 0.5;
    this.music.loop = true;
    this.music.play();
};