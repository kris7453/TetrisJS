var Tetris = Tetris || {};

Tetris.Draw = {};
Tetris.Draw.animeDeleteBegin = 38;
Tetris.Draw.animeDeleteEnd = 38;

Tetris.Draw.tetroids = document.getElementById("tetroids");
Tetris.Draw.numbers = document.getElementById("numbers");

Tetris.Draw.drawTetroid = function( tetroid, x, y ){};
Tetris.Draw.clearTetroid = function( tetroid, x, y ){};
Tetris.Draw.drawBonus = function( game ){};
Tetris.Draw.animeBonus = function(){};
Tetris.Draw.animeDelete = function( rows ) { };
Tetris.Draw.drawMatrix = function( game, x1, y1, x2, y2){};
Tetris.Draw.drawNumber = function( x, y, num ){};


	Tetris.Draw.drawTetroid = function( tetroid, x = tetroid.x, y = tetroid.y )
	{
		var tetroidsImage = Tetris.Draw.tetroids;
		Tetris.ctx.drawImage	(	tetroidsImage, 
									Tetris.Pattern.img[ tetroid.type ][ tetroid.spin ].x, 
									Tetris.Pattern.img[ tetroid.type ][ tetroid.spin ].y, 
									Tetris.Pattern.img[ tetroid.type ][ tetroid.spin ].width, 
									Tetris.Pattern.img[ tetroid.type ][ tetroid.spin ].height, 
									x, 
									y, 
									Tetris.Pattern.img[ tetroid.type ][ tetroid.spin ].width, 
									Tetris.Pattern.img[ tetroid.type ][ tetroid.spin ].height
								);
	};

	Tetris.Draw.clearTetroid = function( tetroid, x = tetroid.x, y = tetroid.y )
	{
		Tetris.ctx.clearRect(	x, 
								y, 
								Tetris.Pattern.img[ tetroid.type ][ tetroid.spin ].width, 
								Tetris.Pattern.img[ tetroid.type ][ tetroid.spin ].height);
	};
	
	Tetris.Draw.drawMatrix = function( game, x1, y1, x2, y2)
	{
	    var tetroidUnits = document.getElementById("tetroidUnits");
	    var levelColor = ( game.level % 10 ) * 19;

		Tetris.ctx.clearRect( x1, y1, x2 - x1 , y2 - y1);
		
		y1 =  (y1 - game.matrix.y1) / 19;
		y2 = (y2 - game.matrix.y1) / 19;
		x1 =  (x1 - game.matrix.x1) / 19;
		x2 = (x2 - game.matrix.x1) / 19;

		for (; y1 < y2; y1++)
			for ( tX = x1; tX < x2; tX++)
				if ( tX >= 0 && y1 >= 0 )
					if ( game.matrix.a[y1][tX] != 0 )
					{
						Tetris.ctx.drawImage	(	tetroidUnits, 
														(game.matrix.a[y1][tX] - 1) * 19, 
														levelColor, 
														19, 
														19, 
														game.matrix.x1 + tX * 19, 
														game.matrix.y1 + y1 * 19, 
														19, 
														19
													);
					}
	};

	Tetris.Draw.drawBonus = function( game )
	{
	    var bonusBackground = document.getElementById("bonusBackground");
	    Tetris.Draw.animeBonus.game = game;
	    Tetris.ctx.drawImage(bonusBackground,
								0,
								0,
								190,
								380,
								game.matrix.getX1(),
								game.matrix.getY1(),
								190,
								380
							);
	    Tetris.Draw.drawNumber( game.matrix.getX1() + 36, game.matrix.getY1() + 62, game.bonusLines[0]);
	    Tetris.Draw.drawNumber( game.matrix.getX1() + 36, game.matrix.getY1() + 136, game.bonusLines[1]);
	    Tetris.Draw.drawNumber( game.matrix.getX1() + 36, game.matrix.getY1() + 211, game.bonusLines[2]);
	    Tetris.Draw.drawNumber( game.matrix.getX1() + 36, game.matrix.getY1() + 286, game.bonusLines[3]);

	    game.bonusLines[0] *= 100;
	    game.bonusLines[1] *= 400;
	    game.bonusLines[2] *= 900;
	    game.bonusLines[3] *= 2500;

	    this.game = game;
	    Tetris.Control.loop = setInterval(function () { Tetris.Draw.animeBonus(); }, 16);
	};

	Tetris.Draw.animeBonus = function()
	{
	    if (typeof this.animeBonus.iteration == "undefined")
	    {
	        this.animeBonus.iteration = 0;
	        this.animeBonus.delay = 0;
	        this.animeBonus.total = 0;
	        this.animeBonus.breakLoop = false;
	        this.animeBonus.numberAnimLoop = null;
	    }

	    if (Tetris.Control.enter && this.animeBonus.iteration < 4)
	        this.animeBonus.breakLoop = true;

	    if (this.animeBonus.numberAnimLoop == null)
	    {
	        
	        if (this.animeBonus.iteration < 4 && !this.animeBonus.breakLoop)
	        {
	            this.animeBonus.numberX = this.game.matrix.getX2() - 4;
	            this.animeBonus.numberY = this.game.matrix.getY1();
	            this.animeNumber.x = this.animeBonus.numberX;

	            if (this.animeBonus.iteration >= 1)
	                this.animeBonus.total += this.game.bonusLines[this.animeBonus.iteration - 1];

	            Tetris.Draw.drawNumber(this.animeBonus.numberX, this.animeBonus.numberY + 341, this.animeBonus.total);

	            switch ( this.animeBonus.iteration )
	            {
	                case 0: this.animeNumber.y = this.animeBonus.numberY + 80;
	                        this.animeNumber.num = this.game.bonusLines[0];
	                        this.animeBonus.numberAnimLoop = setInterval( Tetris.Draw.animeNumber, 1);
	                    break;

	                case 1: this.animeNumber.y = this.animeBonus.numberY + 156;
	                        this.animeNumber.num = this.game.bonusLines[1];
	                        this.animeBonus.numberAnimLoop = setInterval(Tetris.Draw.animeNumber, 1);
	                    break;

	                case 2: this.animeNumber.y = this.animeBonus.numberY + 230;
	                        this.animeNumber.num = this.game.bonusLines[2];
	                        this.animeBonus.numberAnimLoop = setInterval(Tetris.Draw.animeNumber, 1);
	                    break;

	                case 3: this.animeNumber.y = this.animeBonus.numberY + 304;
	                        this.animeNumber.num = this.game.bonusLines[3];
	                        this.animeBonus.numberAnimLoop = setInterval(Tetris.Draw.animeNumber, 1);
	                    break;
	            }
	        }
	        else
	        {
	            if (this.animeBonus.breakLoop)
	            {
	                Tetris.Draw.drawNumber(this.animeBonus.numberX, this.animeBonus.numberY + 80, this.game.bonusLines[0]);
	                Tetris.Draw.drawNumber(this.animeBonus.numberX, this.animeBonus.numberY + 156, this.game.bonusLines[1]);
	                Tetris.Draw.drawNumber(this.animeBonus.numberX, this.animeBonus.numberY + 230, this.game.bonusLines[2]);
	                Tetris.Draw.drawNumber(this.animeBonus.numberX, this.animeBonus.numberY + 304, this.game.bonusLines[3]);

	                for (var i = this.animeBonus.iteration; i < 4; i++)
	                    this.game.scores += this.game.bonusLines[i];

	                this.animeBonus.total = this.game.bonusLines[0] + this.game.bonusLines[1] + this.game.bonusLines[2];
	                this.animeBonus.iteration = 4;
	                this.animeBonus.breakLoop = false;
	            }

	            switch ( this.animeBonus.iteration )
	            {
	                case 4: this.animeBonus.total += this.game.bonusLines[this.animeBonus.iteration - 1];
	                        Tetris.Draw.drawNumber(this.animeBonus.numberX, this.animeBonus.numberY + 341, this.animeBonus.total);
	                        this.animeBonus.numberAnimLoop = null;
	                        this.animeBonus.iteration++;
	                        break;

	                case 5: if (this.animeBonus.delay < 60)
	                            this.animeBonus.delay++;
                            else
	                            this.animeBonus.iteration++;
	                        break;

	                case 6: if (!Tetris.Control.enterPrev && Tetris.Control.enter)
	                {
	                            Tetris.Control.enterPrev = true;
	                            this.animeBonus.total = 0;
	                            this.animeBonus.iteration = 0;
	                            this.animeBonus.delay = 0;
	                            clearInterval(Tetris.Control.loop);
	                            Tetris.ctx.clearRect(   this.game.matrix.getX1(),
                                                        this.game.matrix.getY1(),
                                                        this.game.matrix.getX2(),
                                                        this.game.matrix.getY2());
	                            this.animeBonus.game.animBonus();
	                        }
	                        break;
	            }
	        }
	    } 
	};

	Tetris.Draw.animeNumber = function ()
	{
	    if (typeof Tetris.Draw.animeNumber.value == "undefined")
	        Tetris.Draw.animeNumber.value = 0;

	    if (Tetris.Draw.animeNumber.value < Tetris.Draw.animeNumber.num && !Tetris.Draw.animeBonus.breakLoop)
	    {
	        Tetris.Draw.drawNumber(Tetris.Draw.animeNumber.x, Tetris.Draw.animeNumber.y, Tetris.Draw.animeNumber.value);
	        Tetris.Draw.drawNumber(242, 37, Tetris.Draw.game.scores + Tetris.Draw.animeNumber.value);
	        Tetris.Draw.animeNumber.value += 2;
	    }
	    else
	    {
	        Tetris.Draw.drawNumber(Tetris.Draw.animeNumber.x, Tetris.Draw.animeNumber.y, Tetris.Draw.animeNumber.num);
	        Tetris.Draw.game.scores += Tetris.Draw.animeNumber.num;
	        Tetris.Draw.drawNumber(242, 37, Tetris.Draw.game.scores);

	        clearInterval( Tetris.Draw.animeBonus.numberAnimLoop );
	        Tetris.Draw.animeNumber.value = 0;
	        Tetris.Draw.animeBonus.iteration++;
	        Tetris.Draw.animeBonus.numberAnimLoop = null;
	    }
	};

	Tetris.Draw.animeDelete = function( rows )
	{
		var a = Tetris.Draw;
		var mask = document.getElementById("deleteMask");
		var bonus = document.getElementById("deleteBonus");
		
		if( a.animeDeleteBegin < this.animeDelete.game.matrix.x2 )
		{
			if( a.animeDeleteEnd - a.animeDeleteBegin < mask.width)
			{
				if (a.animeDeleteEnd-a.animeDeleteBegin > 0)
				for (var i = 0; i < rows.length; i++)
					Tetris.ctx.drawImage(	mask,
												mask.width - (a.animeDeleteEnd - a.animeDeleteBegin),
												0,
												a.animeDeleteEnd - a.animeDeleteBegin,
												19,
												this.animeDelete.game.matrix.x1,
												this.animeDelete.game.matrix.y1 + 19 * rows[i],
												a.animeDeleteEnd - a.animeDeleteBegin,
												19);
				a.animeDeleteEnd += 19;
			}
			else
			{
				for (var i = 0; i < rows.length; i++)
				{
					Tetris.ctx.drawImage(	mask,
												0,
												0,
												((this.animeDelete.game.matrix.x2 - a.animeDeleteEnd >= 0) ? mask.width : mask.width +(this.animeDelete.game.matrix.x2 - a.animeDeleteEnd)),
												19,
												a.animeDeleteBegin,
												this.animeDelete.game.matrix.y1 + 19 * rows[i], 
												((this.animeDelete.game.matrix.x2 - a.animeDeleteEnd >= 0) ? mask.width : mask.width +(this.animeDelete.game.matrix.x2 - a.animeDeleteEnd)),
												19);
												
					Tetris.ctx.drawImage(	bonus,
												0,
												(rows.length - 1) * 19,
												((a.animeDeleteBegin + 19 - this.animeDelete.game.matrix.x1 < bonus.width) ? (a.animeDeleteBegin + 19 - this.animeDelete.game.matrix.x1) : bonus.width),
												19,
												this.animeDelete.game.matrix.x1,
												this.animeDelete.game.matrix.y1 + 19 * rows[i], 
												((a.animeDeleteBegin + 19 - this.animeDelete.game.matrix.x1 < bonus.width) ? (a.animeDeleteBegin + 19 - this.animeDelete.game.matrix.x1) : bonus.width),
												19);
				}
				a.animeDeleteBegin += 19;
				a.animeDeleteEnd += 19;
			}
		}
		else
		{
			a.animeDeleteBegin = 38;
			a.animeDeleteEnd = 38;
			clearInterval( Tetris.Control.loop );
			this.animeDelete.game.animDelete( rows );
		}
	};
	
	Tetris.Draw.drawNumber = function( x, y, num )
	{
		var numArray = [];
		
		while ( num > 0 )
		{
			numArray.push( num % 10 );
			num -= numArray[ numArray.length - 1 ];
			num /= 10;
		}
		
		if ( numArray.length == 0 )
			Tetris.ctx.drawImage( numbers, 0, 0, 18, 18, x - 18, y, 18, 18);
		
		for ( var i = numArray.length - 1; i >= 0; i-- )
		    Tetris.ctx.drawImage(numbers, 0, 18 * numArray[i], 18, 18, x - (18 * (i + 1)), y, 18, 18);
			
	};