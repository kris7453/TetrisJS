var Tetris = Tetris || {};

Tetris.Pattern = {	img:	{o:[1], s:[2], t:[4], z:[2], l:[4], j:[4], i:[2]},
				shape:	{o:[1], s:[2], t:[4], z:[2], l:[4], j:[4], i:[2]}};

// O-shape block

	Tetris.Pattern.img['o'][0] = {	x: 0,
									y: 0,
									width: 38,
									height: 38};

	Tetris.Pattern.shape['o'][0] = [[ 8, 9],
									[11,10]]; 

// S-shape block

	Tetris.Pattern.img['s'][0] = {	x: 57,
									y: 57,
									width: 57,
									height: 38};							

	Tetris.Pattern.shape['s'][0] = [[0, 8,4],
									[2,10,0]];

	Tetris.Pattern.img['s'][1] = {	x: 0,
									y: 38,
									width: 38,
									height: 57};

	Tetris.Pattern.shape['s'][1] = [ [ 5,0],
									 [11,9],
									 [ 0,7]];

// T-shape block

	Tetris.Pattern.img['t'][0] = {	x: 171,
									y: 114,
									width: 57,
									height: 38};						 

	Tetris.Pattern.shape['t'][0] = [[2,15,4],
									[0,7,0]];

	Tetris.Pattern.img['t'][1] = {	x: 0,
									y: 95,
									width: 38,
									height: 57};

	Tetris.Pattern.shape['t'][1] = [ [0, 5],
									 [2,12],
									 [0, 7]];

	Tetris.Pattern.img['t'][2] = {	x: 57,
									y: 114,
									width: 57,
									height: 38};

	Tetris.Pattern.shape['t'][2] = [ [0, 5,0],
									 [2,13,4]];

	Tetris.Pattern.img['t'][3] = {	x: 114,
									y: 95,
									width: 38,
									height: 57};							 

	Tetris.Pattern.shape['t'][3] = [ [ 5,0],
									 [14,4],
									 [ 7,0]];

// Z-shape block

	Tetris.Pattern.img['z'][0] = {	x: 57,
									y: 171,
									width: 57,
									height: 38};

	Tetris.Pattern.shape['z'][0] = [[2, 9,0],
									[0,11,4]];

	Tetris.Pattern.img['z'][1] = {	x: 0,
									y: 152,
									width: 38,
									height: 57};

	Tetris.Pattern.shape['z'][1] = [ [0, 5],
									 [8,10],
									 [7, 0]];

// L-shape block

	Tetris.Pattern.img['l'][0] = {	x: 171,
									y: 228,
									width: 57,
									height: 38};

	Tetris.Pattern.shape['l'][0] = [[8,3,4],
									[7,0,0]];

	Tetris.Pattern.img['l'][1] = {	x: 0,
									y: 209,
									width: 38,
									height: 57};

	Tetris.Pattern.shape['l'][1] = [[2,9],
									[0,6],
									[0,7]];

	Tetris.Pattern.img['l'][2] = {	x: 57,
									y: 228,
									width: 57,
									height: 38};

	Tetris.Pattern.shape['l'][2] = [[0,0, 5],
									[2,3,10]];

	Tetris.Pattern.img['l'][3] = {	x: 114,
									y: 209,
									width: 38,
									height: 57};

	Tetris.Pattern.shape['l'][3] = [[ 5,0],
									[ 6,0],
									[11,4]];

// J-shape block

	Tetris.Pattern.img['j'][0] = {	x: 171,
									y: 285,
									width: 57,
									height: 38};

	Tetris.Pattern.shape['j'][0] = [[ 5,0,0],
									[11,3,4]];

	Tetris.Pattern.img['j'][1] = {	x: 0,
									y: 266,
									width: 38,
									height: 57};

	Tetris.Pattern.shape['j'][1] = [ [8,4],
									 [6,0],
									 [7,0]];

	Tetris.Pattern.img['j'][2] = {	x: 57,
									y: 285,
									width: 57,
									height: 38};

	Tetris.Pattern.shape['j'][2] = [[2,3,9],
									[0,0,7]];

	Tetris.Pattern.img['j'][3] = {	x: 114,
									y: 266,
									width: 38,
									height: 57};

	Tetris.Pattern.shape['j'][3] = [ [0, 5],
									 [0, 6],
									 [2,10]];

// I-shape block

	Tetris.Pattern.img['i'][0] = {	x: 57,
									y: 380,
									width: 76,
									height: 19};

	Tetris.Pattern.shape['i'][0] = [[2,3,3,4]];

	Tetris.Pattern.img['i'][1] = {	x: 0,
									y: 323,
									width: 19,
									height: 76};

	Tetris.Pattern.shape['i'][1] = [ [5],
									 [6],
									 [6],
									 [7]];
