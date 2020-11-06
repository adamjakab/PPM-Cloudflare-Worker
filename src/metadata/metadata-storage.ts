import * as _ from "lodash";
import { InstanceCreator } from "../util/instance-creator";
import { Platform } from "../util/platform";

type metadataTypes =  "entity" | "repository";

export class MetadataStorage {
  private repositoryInstances: any = {};
  private _metadata: any = {};

  public getRepositoryForEntityClass = (entityClassName: string) => {
    let repoInstance;

    if (_.has(this.repositoryInstances, entityClassName)) {
      repoInstance = _.get(this.repositoryInstances, entityClassName);
    } else {
      const repoClass = this.getMetadataElementFor("entity", entityClassName, "repository");
      const entityCreator = new InstanceCreator(repoClass);
      repoInstance = entityCreator.getNewInstance();
      _.set(this.repositoryInstances, entityClassName, repoInstance);
    }

    return repoInstance;
  };

  public getMetadataElementFor(type: metadataTypes, name:string, element:string) {
    let md : any = this.getMetadataFor(type, name);

    if (!_.has(md, element)) {
      throw new Error("Unable to find metadata element: " + element);
    }
    md = _.get(md, element);

    return md;
  }


  public getMetadataFor(type: metadataTypes, name:string) {
    let md : {} = this._metadata;

    if (!_.has(md, type)) {
      throw new Error("Unable to find metadata type: " + type);
    }
    md = _.get(md, type);

    if (!_.has(md, name)) {
      throw new Error("Unable to find metadata with name: " + name);
    }
    md = _.get(md, name);

    return md;
  }

  public setMetadataFor(type: metadataTypes, name:string, metadata: {}) {
    let md : {} = this._metadata;

    if (!_.has(md, type)) {
      if (!_.includes(["entity", "repository"], type)) {
        throw new Error("Bad metadata type: " + type);
      }
      _.set(md, type, {});
    }
    md = _.get(md, type);
    _.set(md, name, metadata);
  }
}
