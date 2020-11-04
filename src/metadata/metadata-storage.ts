import * as _ from "lodash";
import { InstanceCreator } from "../util/instance-creator";
import { Platform } from "../util/platform";

export class MetadataStorage {
  public readonly entityMetadata: any = {};
  public readonly repositoryMetadata: any = {};
  private repositoryInstances: any = {};

  public getRepositoryForEntityClass = (entityClass: any) => {
    // Platform.warn("ECName: ", entityClass.name);
    const repoMetadata = _.find(this.repositoryMetadata, {
      entityClass: entityClass,
    });

    if (_.has(this.repositoryInstances, entityClass.name)) {
      return _.get(this.repositoryInstances, entityClass.name);
    } else {
      const repoClass = _.get(repoMetadata, "_class");
      const entityCreator = new InstanceCreator(repoClass);
      const repoInstance = entityCreator.getNewInstance();
      _.set(this.repositoryInstances, entityClass.name, repoInstance);
      return repoInstance;
    }
  };
}
