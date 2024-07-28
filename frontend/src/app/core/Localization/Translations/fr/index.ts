import rescommon from "./rescommon.json";
import resdomain from "./resdomain.json";
import resshared from "./resshared.json";

const getResourceFileFr = (name: string) => {
    
    switch(name){
        case "rescommon" :
            return rescommon;
        case "resdomain" :
            return resdomain;

        case "resshared":
            return resshared;
    }
}

export default getResourceFileFr;