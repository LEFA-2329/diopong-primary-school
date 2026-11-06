/* Explicit topic labels for the supplementary bilingual activity library. */
const activityTopicLabels = {
 counting:{en:'Counting and number sense',nso:'Go bala le kwešišo ya dipalo'},
 operations:{en:'Number operations',nso:'Mešomo ya dipalo'},
 patterns:{en:'Number and shape patterns',nso:'Dipatrone tša dipalo le dibopego'},
 shapes:{en:'Shapes and position',nso:'Dibopego le maemo'},
 measurement:{en:'Measurement and time',nso:'Go ela le nako'},
 fractions:{en:'Fractions',nso:'Dipalophatlo'},
 decimals:{en:'Decimals',nso:'Dipalo tša tesimale'},
 percentages:{en:'Percentages and ratios',nso:'Diperesente le dikabo'},
 money:{en:'Money and budgeting',nso:'Tšhelete le tekanyetšo'},
 data:{en:'Data and probability',nso:'Tshedimošo le kgonagalo'},
 algebra:{en:'Algebra',nso:'Altšebra'},
 reading:{en:'Reading and comprehension',nso:'Go bala le kwešišo'},
 writing:{en:'Writing and description',nso:'Go ngwala le go hlaloša'},
 storytelling:{en:'Storytelling and sequence',nso:'Go anega le tatelano'},
 reasoning:{en:'Opinions and reasons',nso:'Dikgopolo le mabaka'},
 plants:{en:'Plants and observation',nso:'Dimela le go lebelela'},
 materials:{en:'Materials and properties',nso:'Didirišwa le dipharologantšho'},
 weather:{en:'Weather',nso:'Maemo a leratadima'},
 routines:{en:'Routines and responsibility',nso:'Ditlwaelo le maikarabelo'},
 kindness:{en:'Kindness and inclusion',nso:'Botho le go akaretša'}
};
const activityTopics = {};
const topicGroups = {
 counting:['Count together','Tens and ones','Expanded numbers','Compare groups','Count backwards','Find a pair','Missing numbers','Compare numbers','Skip count','Order numbers','Rounding'],
 operations:['Add small groups','Take away','Equal groups','Share equally','Double it','Make ten','Missing addend','Share fruit','Multiply','Subtract with regrouping','Multiplication steps','Division check','Multiply two digits','Integer operations'],
 patterns:['Number patterns','Copy a pattern','Number rule'],
 shapes:['Shapes around us','Position words','Shape sides','Triangle angles'],
 measurement:['Long and short','Time steps','Measure perimeter','Time difference','Rectangle area','Convert length','Area and volume','Volume problem'],
 fractions:['Fractions','Equivalent fractions','Half a shape','Quarter of a group','Compare fractions','Fraction of a collection','Add unlike fractions'],
 decimals:['Subtract decimals','Decimal multiplication','Order decimals'],
 percentages:['Percentages','Find a percentage','Ratios','Percentage discount'],
 money:['Shopping change','Coin totals','Money change','Profit calculation'],
 data:['Read a tally','Data range','Mean and median','Probability'],
 algebra:['Solve an equation','Algebra substitution'],
 reading:['Listen and tell','Read for meaning','Fact and inference','Ask useful questions'],
 writing:['Draw and describe','A clear paragraph','Describe an object'],
 storytelling:['Sequence a journey','A different ending'],
 reasoning:['Support your opinion'],
 plants:['Notice a plant','Observe and compare'],
 materials:['Sort materials'],weather:['Track the weather'],
 routines:['A helpful routine','Care for shared spaces'],kindness:['Choose a kind response']
};
Object.entries(topicGroups).forEach(([topic,titles])=>titles.forEach(title=>{activityTopics[title]=topic;}));
