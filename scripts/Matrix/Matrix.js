var Tetris = Tetris || {};

Tetris.Matrix = function( x1, x2, y1, y2)
{
	this.x1 = x1
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.latestRow = 19;
	this.a = [20];
	
	for (var i = 0; i < 20; i++)
	{
		this.a[i] = [10];

		for (var j = 0; j < 10; j++)
			this.a[i][j] = 0;
	}
};

Tetris.Matrix.getX1 = function(){};
Tetris.Matrix.getX2 = function(){};
Tetris.Matrix.getY1 = function(){};
Tetris.Matrix.getY2 = function(){};

	Tetris.Matrix.prototype.getX1 = function()
	{
		return this.x1;
	};

	Tetris.Matrix.prototype.getX2 = function()
	{
		return this.x2;
	};

	Tetris.Matrix.prototype.getY1 = function()
	{
		return this.y1;
	};

	Tetris.Matrix.prototype.getY2 = function()
	{
		return this.y2;
	};

Tetris.Matrix.checkCollision = function( tetroid, xOffset, yOffset){};
Tetris.Matrix.updateBlocks = function( row, yOffset ){};
Tetris.Matrix.checkLines = function( begin, end){};
Tetris.Matrix.deleteLines = function( allBlocks ){};
Tetris.Matrix.deleteEmptyLines = function( notEmptyRow, firstEmpty ){};
Tetris.Matrix.addBlocks = function( blocks ){};

	Tetris.Matrix.prototype.checkCollision = function( tetroid, xOffset, yOffset )
	{
	    if (typeof this.checkCollision.checking == "undefined")
	        this.checkCollision.checking = true;

	    this.checkCollision.checking = true;
		var t = tetroid;
		var p = Tetris.Pattern.shape[t.type][t.spin];
		var x = (t.getX1() - this.x1) / 19 + xOffset;
		var y = (t.getY1() - this.y1) / 19 + yOffset;
		
		for ( var row = 0; row < p.length; row++)
		{
			if ( y + row < 0)
				continue;
			
			for ( var col = 0; col < p[row].length; col++)
			    if ((this.a[y + row][x + col] * p[row][col]) != 0)
			    {
			        this.checkCollision.checking = false;
					return true;
			    }
		}
		this.checkCollision.checking = false;
		return false;
	};
	
	Tetris.Matrix.prototype.updateBlocks = function( row, yOffset )
	{
		if ( yOffset == -1 )
			for (var col = 0; col < this.a[row].length; col++)
			{
				switch (this.a[row][col])
				{
					case  5: this.a[row][col] = 1;
							 break;

					case  6: this.a[row][col] = 7;
							 break;				

					case  8: this.a[row][col] = 2;
							 break;

					case  9: this.a[row][col] = 4;
							 break;

					case  12: this.a[row][col] = 10;
							 break;

					case  14: this.a[row][col] = 11;
							 break;

					case  15: this.a[row][col] = 3;
							 break;
				}
			}
		else
			for (var col = 0; col < this.a[row].length; col++)
			{
				switch (this.a[row][col])
				{
					case  6: this.a[row][col] = 5;
							 break;

					case  7: this.a[row][col] = 1;
							 break;

					case 10: this.a[row][col] = 4;
							 break;

					case 11: this.a[row][col] = 2;
							 break;

					case  12: this.a[row][col] = 9;
							 break;

					case  13: this.a[row][col] = 3;
							 break;		

					case  14: this.a[row][col] = 8;
							 break;
				}
			}
	};
	
	Tetris.Matrix.prototype.checkLines = function( begin, end)
	{
		var all;
		var allBlocks = [];
		end = (end - this.y1) / 19;
		
		for (var row = this.latestRow; row < this.a.length; row++)
		{
			all = this.a[row][0];
			
			for (var col = 1; col < this.a[row].length; col++)
			{
				all *= this.a[row][col];
			}
			
			if ( all > 0 )
				allBlocks.push( row );
		}
		
		return allBlocks;
	};

	

	Tetris.Matrix.prototype.deleteLines = function( allBlocks )
	{ 	
		var notEmptyRow = [];
		
		for ( var i = 0; i < allBlocks.length; i++) 
		{
			if (allBlocks[i]-1 >= this.latestRow) // if is anything above
				if ( i > 0 )
				{
					if ( allBlocks[i] - allBlocks[i-1] > 1 ) // update only if previous line not lay directly
						this.updateBlocks( allBlocks[i]-1, -1);
				}
				else
					this.updateBlocks( allBlocks[i]-1, -1);
			
			if ( allBlocks[i] + 1 < this.a.length ) // if is anything under
				if ( i < allBlocks.length - 1 )
				{
					if ( allBlocks[i+1] - allBlocks[i] > 1 ) // update only if next line not lay directly
						this.updateBlocks( allBlocks[i]+1, +1);
				}
				else
					this.updateBlocks( allBlocks[i]+1, +1);
			
			for (var col = 0; col < this.a[ allBlocks[i] ].length; col++)
				this.a[ allBlocks[i] ][col] = 0;			
		}
		
		var notEmpty;
		
		for (var row = this.latestRow; row < allBlocks[ allBlocks.length - 1 ] ; row++)
		{
			notEmpty = true;
			
			for ( var i = 0; i < allBlocks.length; i++)
				if ( row == allBlocks[i] )
				{
					notEmpty = false;
					break;
				}
			
			if (notEmpty)
				notEmptyRow.push(row);
		}
			
		if (notEmptyRow.length > 0)
			this.deleteEmptyLines( notEmptyRow,  allBlocks[ allBlocks.length - 1 ]);
	};

	Tetris.Matrix.prototype.deleteEmptyLines = function( notEmptyRow, firstEmpty )
	{
		for (var row = notEmptyRow.length - 1; row >= 0; row--)
		{
			for (var col = 0; col < this.a[row].length; col++)
			{
				this.a[firstEmpty][col] = this.a[notEmptyRow[row]][col];
				this.a[notEmptyRow[row]][col] = 0;
			}
			
			firstEmpty--;
		}
	};

	Tetris.Matrix.prototype.addBlocks = function( game, blocks )
	{
		var t = game.tetroid;
		var x = (t.getX1() - this.x1) / 19;
		var y = (t.getY1() - this.y1) / 19;
		
		if (y < 0)
		    return false;
		else
		{
		    if ( y < this.latestRow )
			    this.latestRow = y;
		
		    for ( var row = 0; row < blocks.length; row++)
			    for (var col = 0; col < blocks[row].length; col++)
			        this.a[y + row][x + col] |= blocks[row][col];

		    return true;
		}
	};