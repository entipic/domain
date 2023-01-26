import { Repository, RepositoryAccessOptions } from "./repository";
import { Topic } from "../entities/topic";

export interface TopicsListParams {
  limit: number;
}

export interface TopicRepository extends Repository<Topic> {
  topicBySlug(
    slug: string,
    options?: RepositoryAccessOptions<Topic>
  ): Promise<Topic | null>;
  popularTopics(
    params: TopicsListParams,
    options?: RepositoryAccessOptions<Topic>
  ): Promise<Topic[]>;
  latestTopics(
    params: TopicsListParams,
    options?: RepositoryAccessOptions<Topic>
  ): Promise<Topic[]>;
}
