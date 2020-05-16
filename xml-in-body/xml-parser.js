import { XmlParser, promise } from "fortjs";
import xml2js from "xml2js";
export class XmlToJsonParser extends XmlParser {
    parse(xml) {
        return new Promise((res, rej) => {
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    rej(err);
                }
                res(result);
            });
        })


    }
}