import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class HelperService {
    async jsonDataParser(data) {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const res = JSON.parse(data[i].data);
            result.push(res);
        }
        return result;
    }

    async deleteAttachment(path): Promise<{}> {
        try {
            fs.unlinkSync(path);
        } catch (err) {
            return { status: false, message: err };
        }
        return { status: true };
    }
}
