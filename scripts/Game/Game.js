var Tetris = Tetris || {};

Tetris.Game = function( events, startLevel )
{
    this.tetroid = null;
    this.nextTetroid = null;
    this.matrix = null;

    //Tetris.Game.play.js
    this.playGame = true;

    this.lose = false;

    this.speed = 48;
    this.frame = 0;
    this.linesToLevel = 30;
    this.linesCleared = 0;

    this.level = startLevel;
    this.lines = 0;
    this.scores = 0;
    this.speededMoves = 0;
    this.lastSpeededLine = -1;
    this.instantDrop = false;

    this.bonusLines = [4];
    this.checkEvents = events;
    this.init();
};

    Tetris.Game.init = function(){};
    Tetris.Game.createNewTetroid = function( x, y, type, spin){};

    Tetris.Game.play = function(){};
    Tetris.Game.checkLevel = function(){};
    Tetris.Game.addScores = function( multiplier ){};
    Tetris.Game.animDelete = function( rows ){};

    Tetris.Game.prototype.init = function()
    {	
        this.matrix = new Tetris.Matrix(38, 228, 144, 524);
        this.bonusLines[0] = this.bonusLines[1] = this.bonusLines[2] = this.bonusLines[3] = 0;
        this.tetroid = this.createNewTetroid(114, 106);
        this.nextTetroid = this.createNewTetroid(114, 106);
        Tetris.Draw.drawTetroid( this.nextTetroid, 40, 58 );

        for (var i = 0; i < this.level; i++ )
            this.speed = Math.round( this.speed * 0.9 );

        Tetris.Draw.drawNumber( 242, 112, this.level ); // draw level number
    };

    Tetris.Game.prototype.createNewTetroid = function( x, y, type = 't', spin = 0)
    {
    	if (this.tetroid == null)
    		return new Tetris.Tetroid	(
    										x,
    										y,
    										type,
    										spin
    									);
			
    	var i;
		
    	for (i = 0; i < Tetris.Tetroid.types.length; i++)
    	{
    		if ( this.tetroid.type == Tetris.Tetroid.types[i])
    			break;
    	}
		
    	i++;
		
    	i = (i >= Tetris.Tetroid.types.length) ? 0 : i;
		
    	return new Tetris.Tetroid	(
    									x,
    									y,
    									Tetris.Tetroid.types[i],
    									0
    								);
    };

    Tetris.Game.prototype.checkLevel = function()
    {
    	if ( this.linesCleared >= this.linesToLevel )
    	{
    	    this.linesCleared -= this.linesToLevel;
    		this.level++;
    		this.speed = Math.round( this.speed * 0.9 );
    		this.frame = 0;
			
    		Tetris.Draw.drawNumber( 242, 112, this.level ); // draw level number
            
    		return true;
    	}

    	return false;
    };

    Tetris.Game.prototype.addScores = function( multiplier )
    {
    	var scores = Math.pow( this.level + 1, 2) + multiplier * ( this.level + 1 );
		
    	if ( this.instantDrop || (this.speededMoves > 2 &&
    		this.lastSpeededLine - (( this.matrix.getY2() - this.tetroid.getY2())/ 19) < 2))
    			scores *= 2;
				
    	this.speededMoves = 0;
    	this.lastSpeededLine = -1;
    	this.scores += scores;
    };

    Tetris.Game.prototype.animBonus = function()
    {
        if ( typeof this.animBonus.anim == "undefined" )
            this.animBonus.anim = true;

        if ( this.animBonus.anim )
        {
            this.animBonus.anim = false;
            if ( Tetris.Control.music.music != null )
                Tetris.Control.music.music.pause();
            Tetris.Control.music.levelUp.play();
            Tetris.Draw.drawBonus( this );
        }
        else
        {
            this.animBonus.anim = true;
            if ( Tetris.Control.music.music != null )
                Tetris.Control.music.music.play();
            Tetris.Draw.drawMatrix( this,
                                    this.matrix.x1,
    								this.matrix.y1 + this.matrix.latestRow * 19,
    								this.matrix.x2,
    								this.matrix.y2);
            for (var i = 0; i < 4; i++)
                this.bonusLines[i] = 0;

            Tetris.Control.loop = setInterval( Tetris.Control.singlePlayer, 16);
        }
    };

    Tetris.Game.prototype.animDelete = function( rows )
    {
    	if ( typeof this.animDelete.anim == "undefined" )
    		this.animDelete.anim = true;
		
    	if ( this.animDelete.anim )
    	{
    		this.animDelete.anim = false;
    		clearInterval( Tetris.Control.loop );
    		Tetris.Draw.animeDelete.game = this;
    		Tetris.Control.loop = setInterval( function(){Tetris.Draw.animeDelete( rows );}, 48) ;		
    	}
    	else
    	{
    	    Tetris.Control.music.lineClear.play();
    		this.animDelete.anim = true;
    		this.matrix.deleteLines( rows );
    	    Tetris.Draw.drawMatrix( this,
                                    this.matrix.x1,
    								this.matrix.y1 + this.matrix.latestRow * 19,
    								this.matrix.x2,
    								this.matrix.y2);
    	    this.linesCleared += rows.length;
    	    this.lines += rows.length;
    	    this.bonusLines[ rows.length - 1 ]++;
    		Tetris.Draw.drawNumber( 242, 74, this.lines ); // draw lines number
    		this.matrix.latestRow += rows.length;
    		
    		if ( this.checkLevel() )
    		    this.animBonus();
            else
    		    Tetris.Control.loop = setInterval( Tetris.Control.singlePlayer, 16);
    	}
    };