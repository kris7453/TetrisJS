var Tetris = Tetris || {};

Tetris.Game.prototype.play = function()
{		
	if ( !this.lose && this.playGame )
	{
	    if (this.tetroid == null)
	    {
	        this.tetroid = this.nextTetroid;
	        Tetris.Draw.clearTetroid(this.nextTetroid, 40, 58);
	        this.nextTetroid = null;

	        var type = Math.floor( Math.random() *  Tetris.Tetroid.types.length );
	        this.nextTetroid = this.createNewTetroid(114, 106, type);
	        Tetris.Draw.drawTetroid(this.nextTetroid, 40, 58);
	    }

	    this.checkEvents();
		
		if ( this.frame < this.speed )
			this.frame++;
		else
		{
			do
			{
				if ( !this.matrix.checkCollision.checking )
					if ( (this.tetroid.getY2() < this.matrix.getY2()) && 
						!this.matrix.checkCollision( this.tetroid, 0, +1) )
					{
						this.tetroid.move( this, Tetris.Tetroid.direction.down );
						this.frame = 0;
					}
					else
					{
						if (this.matrix.addBlocks(this, this.tetroid.getBlockUnits()))
						{
							Tetris.Control.downPrev = true;
							Tetris.Control.down = true;
							Tetris.Control.music.blockHit.play();
							this.addScores( (this.matrix.getY2() - this.tetroid.getY2()) / 19 );
							Tetris.Draw.drawNumber(242, 37, this.scores); // draw scores number
							Tetris.Draw.drawMatrix( this,
													this.tetroid.getX1(),
													this.tetroid.getY1(),
													this.tetroid.getX2(),
													this.tetroid.getY2());
							
							var allBlocks = this.matrix.checkLines( this.tetroid.getY1(), this.tetroid.getY2());
							if ( allBlocks.length > 0 )
								this.animDelete( allBlocks );
						
							this.tetroid = null;
						}
						else
						{
							this.lose = true;
							if (Tetris.Control.music.music != null)
								Tetris.Control.music.music.pause();
							Tetris.Control.music.gameOver.currentTime = 0.0;
							Tetris.Control.music.gameOver.play();
							var gameOver = document.getElementById("gameOver");
							Tetris.ctx.drawImage(gameOver, 0, 0, gameOver.width, gameOver.height, (600 - gameOver.width) / 2, (560 - gameOver.height) / 2, gameOver.width, gameOver.height);
						}

						if (this.instantDrop)
							this.instantDrop = false;
					}
			} while (this.instantDrop);
		}
	}
	else // if lose or pause game
	{
        if (this.lose)
	        if (!Tetris.Control.enterPrev && Tetris.Control.enter)
	        {
	            Tetris.Control.enterPrev = true;
	            Tetris.Control.music.gameOver.pause();
	            clearInterval(Tetris.Control.loop);
	            Tetris.Control.init();
	        }

        if (!this.playGame)
        {
            if (!Tetris.Control.enterPrev && Tetris.Control.enter)
            {
                var pause = document.getElementById("pause");
                Tetris.ctx.clearRect((600 - pause.width) / 2, (560 - pause.height) / 2-1, pause.width, pause.height+2);
                Tetris.Control.enterPrev = true;
                if (Tetris.Control.music.music != null)
                    Tetris.Control.music.music.play();
                this.playGame = true;
				Tetris.Control.rotate = 0;
            }
            if (Tetris.Control.enterPrev && !Tetris.Control.enter)
                Tetris.Control.enterPrev = false;
        }

	}
};