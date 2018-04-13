import { Injectable } from '@angular/core';

import { EnvironmentConfig } from '../models/environment-config.model';

@Injectable()
export class EnvironmentService {

    constructor(private environmentConfig: EnvironmentConfig) { }

    IsDevelopment(): boolean {
        return !this.environmentConfig.production;
    }
}
