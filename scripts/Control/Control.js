var Tetris = Tetris || {};
Tetris.Control = {};

Tetris.Control.up = false;
Tetris.Control.upPrev = false;
Tetris.Control.left = false;
Tetris.Control.right = false;
Tetris.Control.down = false;
Tetris.Control.downPrev = false;
Tetris.Control.restart = false;
Tetris.Control.enter = false;
Tetris.Control.space = false;
Tetris.Control.enterPrev = false;
Tetris.Control.rotate = 0;

Tetris.Control.checkGlobalEvents = function(){};
Tetris.Control.checkIngameEvents = function(){};

Tetris.canvas = document.getElementById("canvas");
Tetris.ctx = Tetris.canvas.getContext("2d");


Tetris.Control.music = new Tetris.Music();
Tetris.Control.game = null;
Tetris.Control.menu = null;
Tetris.Control.loop = null;

Tetris.Control.keyDownEvent = function(event)
{
	// Ustalenie argumentu zdarzenia i klawisza zależnie od przeglądarki
	event = event || targetdow.event;
	var key = event.keyCode || event.which;

	// Wyłączenie domyślnego zdarzenia klawiszy
	event.preventDefault();

	switch (key)
	{
		case 37: Tetris.Control.left = true; break;
		case 39: Tetris.Control.right = true; break;
		case 38: Tetris.Control.up = true; break;
		case 40: Tetris.Control.down = true; break;
		case "Z".charCodeAt(0): Tetris.Control.rotate = -1; break;
		case "X".charCodeAt(0): Tetris.Control.rotate = 1; break;
		case "C".charCodeAt(0): Tetris.Control.game.matrix = new Tetris.Matrix( 38, 228, 144, 524); Tetris.ctx.clearRect(38, 144, 190, 380);break;
		case 82: Tetris.Control.restart = true; break; // Klawisz r
	    case 13: Tetris.Control.enter = true; break; // Enter
	    case 32: Tetris.Control.space = true; break; // Space
	}	
};

Tetris.Control.keyUpEvent = function(event)
{
	// Ustalenie argumentu zdarzenia i klawisza zależnie od przeglądarki
	event = event || targetdow.event;
	var key = event.keyCode || event.which;

	// Wyłączenie domyślnego zdarzenia klawiszy
	event.preventDefault();

	// TUTAJ WPISZ JAKIE KLAWISZE CHCESZ OBSŁUGIWAĆ
	switch (key)
	{
		case 37: Tetris.Control.left = false; break;
	    case 39: Tetris.Control.right = false; break;
	    case 38: Tetris.Control.up = false; break;
	    case 40: Tetris.Control.down = false; break;
		case 82: Tetris.Control.restart = false; break; // Klawisz r
	    case 13: Tetris.Control.enter = false; break; // Enter
	    case 13: Tetris.Control.space = false; break; // Space
	}
};

Tetris.Control.init = function()
{
	// Ustawienie zdarzeń klawiatury
	document.onkeydown = Tetris.Control.keyDownEvent;
	document.onkeyup = Tetris.Control.keyUpEvent;

	Tetris.Control.menu = new Tetris.Menu();

	Tetris.Control.loop = setInterval(function () { Tetris.Control.menu.splashScreen();}, 16);
};

Tetris.Control.singlePlayer = function()
{
    Tetris.Control.checkGlobalEvents();
    Tetris.Control.game.play();
};

Tetris.Control.checkGlobalEvents = function()
{
	if (Tetris.Control.restart)
	{
		clearInterval(Tetris.Control.loop);
		this.playGame = false;
		Tetris.Control.firstGame = null;

	    if (Tetris.Control.music.music != null)
			Tetris.Control.music.music.pause();
			
		Tetris.Control.music.music = null;
		Tetris.Control.init();
	}
	
};

Tetris.Control.checkMenuEvents = function ()
{
    var menu = Tetris.Control.menu;

    if (!Tetris.Control.upPrev && Tetris.Control.up)
    {
        Tetris.Control.menu.chooseMusic.changedOption = true;
        Tetris.Control.music.changeOption.pause();
        Tetris.Control.music.changeOption.currentTime = 0.0;
        Tetris.Control.music.changeOption.play();

        Tetris.Control.upPrev = true;

        Tetris.ctx.clearRect(menu.pointer.x, menu.pointer.y + 19 * menu.currentOption, menu.pointer.image.width, menu.pointer.image.height);
        menu.currentOption--;

        if (menu.currentOption < 0)
            menu.currentOption = menu.menuOption[menu.menuStep] - 1;

        //draw select pointer
        Tetris.ctx.drawImage(menu.pointer.image, 0, 0, menu.pointer.image.width, menu.pointer.image.height,
                                menu.pointer.x, menu.pointer.y + 19 * menu.currentOption, menu.pointer.image.width, menu.pointer.image.height);
    }

    if (Tetris.Control.upPrev && !Tetris.Control.up)
    {
        Tetris.Control.upPrev = false;
    }

    if (!Tetris.Control.downPrev && Tetris.Control.down)
    {
        Tetris.Control.menu.chooseMusic.changedOption = true;
        Tetris.Control.music.changeOption.pause();
        Tetris.Control.music.changeOption.currentTime = 0.0;
        Tetris.Control.music.changeOption.play()
        
        Tetris.Control.downPrev = true;        
        
        Tetris.ctx.clearRect(menu.pointer.x, menu.pointer.y + 19 * menu.currentOption, menu.pointer.image.width, menu.pointer.image.height);
        menu.currentOption++;

        if (menu.currentOption == menu.menuOption[menu.menuStep])
            menu.currentOption = 0;
        //draw select pointer
        Tetris.ctx.drawImage(menu.pointer.image, 0, 0, menu.pointer.image.width, menu.pointer.image.height,
                                menu.pointer.x, menu.pointer.y + 19 * menu.currentOption, menu.pointer.image.width, menu.pointer.image.height);
    }

    if (Tetris.Control.downPrev && !Tetris.Control.down)
    {
        Tetris.Control.downPrev = false;
    }
};

Tetris.Control.checkIngameEvents = function()
{
    var firstGame = Tetris.Control.game;
	
//--------------------------------------------------------------------------------------------------------- Tetris.Control.left

	if ( Tetris.Control.left )
	{				
		if ( firstGame.tetroid.getX1() > firstGame.matrix.x1 && 
			!firstGame.matrix.checkCollision( firstGame.tetroid, -1, 0) )
		{
		    firstGame.tetroid.move( firstGame, Tetris.Tetroid.direction.left );
			firstGame.speededMoves = 0;
			Tetris.Control.left = false;
		}
	}

//--------------------------------------------------------------------------------------------------------- Tetris.Control.up
	
	if ( Tetris.Control.up )
	{
	    Tetris.Draw.clearTetroid( firstGame.tetroid );
		firstGame.tetroid = firstGame.createNewTetroid( firstGame.tetroid.x, firstGame.tetroid.y );
		Tetris.Draw.drawTetroid( firstGame.tetroid );
		Tetris.Control.up = false;
	}

//--------------------------------------------------------------------------------------------------------- Tetris.Control.right
	
	if (Tetris.Control.right)
	{
		if ( firstGame.tetroid.getX2() < firstGame.matrix.x2  && 
			!firstGame.matrix.checkCollision( firstGame.tetroid, +1, 0) )
		{
		    firstGame.tetroid.move( firstGame, Tetris.Tetroid.direction.right );
			firstGame.speededMoves = 0;
			Tetris.Control.right = false;
		}
	}
	
//--------------------------------------------------------------------------------------------------------- Tetris.Control.down
	
	if (!Tetris.Control.downPrev && Tetris.Control.down)
	{
		firstGame.frame = firstGame.speed;
		
		if ( firstGame.lastSpeededLine == -1 )
			firstGame.lastSpeededLine = ( firstGame.matrix.getY2() - firstGame.tetroid.getY2())/ 19;
		else 
			if ( firstGame.lastSpeededLine - (( firstGame.matrix.getY2() - firstGame.tetroid.getY2())/ 19) > 1)
			{
				firstGame.speededMoves = 1;
				firstGame.lastSpeededLine = ( firstGame.matrix.getY2() - firstGame.tetroid.getY2())/ 19;
			}
			else
			{
				firstGame.speededMoves++;
				firstGame.lastSpeededLine--;
			}

		Tetris.Control.down = false;
	}

	if (Tetris.Control.downPrev && !Tetris.Control.down)
	{
	    Tetris.Control.downPrev = false;
	}
	
//--------------------------------------------------------------------------------------------------------- Tetris.Control.rotate
	
	if (Tetris.Control.rotate != 0)
	if ( !firstGame.matrix.checkCollision.checking )
	{
		var tRotates = Tetris.Pattern.shape[ firstGame.tetroid.getType() ].length;
		var nextSpin = firstGame.tetroid.getSpin() + Tetris.Control.rotate;
			
			if( nextSpin == -1)
				nextSpin = tRotates - 1;
			
			if( nextSpin == tRotates )
				nextSpin = 0;

		var tetroid = new Tetris.Tetroid	(	firstGame.tetroid.getX1(),
												firstGame.tetroid.getY1(),
												firstGame.tetroid.getType(),
												nextSpin
											);
											
			if (tetroid.getX2() <= firstGame.matrix.x2 && tetroid.getY2() <= firstGame.matrix.y2 &&
				!Tetris.Control.game.matrix.checkCollision( tetroid, 0, 0))
				{
					firstGame.tetroid.rotate( firstGame, nextSpin );
					firstGame.speededMoves = 0;
				}
				
		Tetris.Control.rotate = 0;
	}

//--------------------------------------------------------------------------------------------------------- Tetris.Control.enter

    if (!Tetris.Control.enterPrev && Tetris.Control.enter)
	{
	    Tetris.Control.enterPrev = true;
	    this.playGame = false;

	    if (Tetris.Control.music.music != null)
	        Tetris.Control.music.music.pause();

	    var pause = document.getElementById("pause");
	    Tetris.ctx.drawImage(pause, 0, 0, pause.width, pause.height, (600 - pause.width) / 2, (560 - pause.height) / 2, pause.width, pause.height);
	}

	if (Tetris.Control.enterPrev && !Tetris.Control.enter)
		Tetris.Control.enterPrev = false;
		
//--------------------------------------------------------------------------------------------------------- Tetris.Control.space

if ( Tetris.Control.space )
{
	firstGame.instantDrop = true;
	Tetris.Control.space = false;
}
	
};
