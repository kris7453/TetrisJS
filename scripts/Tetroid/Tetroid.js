var Tetris = Tetris || {};

Tetris.Tetroid = function( x, y, type, spin)
{
	this.x = x;
	this.y = y;
	this.type = type;
	this.spin = spin;
};

Tetris.Tetroid.types = ['o', 's', 't', 'z', 'l', 'j', 'i'];
Tetris.Tetroid.direction = 
{
	left: 0,
	right: 1,
	down: 2
};

Tetris.Tetroid.getX1 = function(){};
Tetris.Tetroid.getX2 = function(){};
Tetris.Tetroid.getY1 = function(){};
Tetris.Tetroid.getY2 = function(){};
Tetris.Tetroid.getType = function(){};
Tetris.Tetroid.getSpin = function(){};
Tetris.Tetroid.getBlockUnits = function(){};

	Tetris.Tetroid.prototype.getX1 = function()
	{
		return this.x;
	};

	Tetris.Tetroid.prototype.getX2 = function()
	{
		return this.x + Tetris.Pattern.img[this.type][this.spin].width;
	};

	Tetris.Tetroid.prototype.getY1 = function()
	{
		return this.y;
	};

	Tetris.Tetroid.prototype.getY2 = function()
	{
		return this.y + Tetris.Pattern.img[this.type][this.spin].height;
	};

	Tetris.Tetroid.prototype.getType = function()
	{
		return this.type;
	};

	Tetris.Tetroid.prototype.getSpin = function()
	{
		return this.spin;
	};
	
	Tetris.Tetroid.prototype.getBlockUnits = function()
	{
		return Tetris.Pattern.shape[this.type][this.spin];
	};

Tetris.Tetroid.move = function( game, direction ){};
Tetris.Tetroid.rotate = function( game, rotate ){};

	
		Tetris.Tetroid.prototype.move = function( game, direction )
		{
			Tetris.Draw.clearTetroid( this );
			Tetris.Draw.drawMatrix( game, this.x, this.y, this.getX2(), this.getY2());
			
			switch ( direction )
			{
				case Tetris.Tetroid.direction.left:	this.x -= 19;
												break;
												
				case Tetris.Tetroid.direction.right:	this.x += 19;
												break;
												
				case Tetris.Tetroid.direction.down:	this.y += 19;
												break;
			}
			
			Tetris.Draw.drawTetroid( this );
		};
		
		Tetris.Tetroid.prototype.rotate = function( game, spin )
		{			
			Tetris.Draw.clearTetroid( this );
			Tetris.Draw.drawMatrix( game, this.x, this.y, this.getX2(), this.getY2());
			this.spin = spin;
			Tetris.Draw.drawTetroid( this );
		};