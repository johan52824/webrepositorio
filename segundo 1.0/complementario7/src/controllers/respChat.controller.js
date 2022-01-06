const dataLegend = require('../../data.json');


const normalizeString = (str) => {
    const strLower = str.toLowerCase();
    const sinAccent = strLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return sinAccent.split(/\s/);
}


const buscarOptionsAct = ( legend, control ) => {
    let result;
    
    if( legend === dataLegend.legend ){
        return result = dataLegend.options;
    }
    control.map((opt) => {
        let { legenOPT = legend, options } = opt;
        
        if(!result){
            if(legend === legenOPT){
                console.log(options);
                return result = options;
            }
        }
        
    })

    return result;

}


module.exports = {
    normalizeString,
    buscarOptionsAct,
    dataLegend
};