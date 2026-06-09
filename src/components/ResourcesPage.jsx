import { useMemo, useState } from "react";
import { FileArchive, FolderOpen, Search } from "lucide-react";
import {
  portalMeta,
  resourceCategories,
  resourceHref,
  resources,
} from "../data/portalData";
import {
  EmptyState,
  OpenResourceButton,
  PageHeader,
  SectionHeader,
} from "./Ui";

export default function ResourcesPage() {
  const [category, setCategory] = useState("全部");
  const [search, setSearch] = useState("");

  const filteredResources = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return resources.filter((resource) => {
      const text = `${resource.title} ${resource.description} ${resource.category}`.toLowerCase();
      return (
        (category === "全部" || resource.category === category) &&
        (!keyword || text.includes(keyword))
      );
    });
  }, [category, search]);

  return (
    <div className="page">
      <PageHeader
        title="资料中心"
        description="集中查看0609完成稿、领导方案、竹网行动修订稿、薪火计划、单位探索台账和调研支撑资料。"
        meta={`当前制度版本：${portalMeta.versionStatus}`}
      />

      <section className="panel resource-filter-panel">
        <div className="resource-tabs" role="tablist" aria-label="资料分类">
          {resourceCategories.map((item) => (
            <button
              className={category === item ? "active" : ""}
              type="button"
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="search-field resource-search">
          <span className="sr-only">搜索资料</span>
          <Search size={17} aria-hidden="true" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="搜索资料名称或内容"
          />
        </label>
      </section>

      <section className="panel">
        <SectionHeader
          title="现有成果"
          description={`当前显示 ${filteredResources.length} 项资料。`}
        />
        {filteredResources.length ? (
          <div className="resource-list">
            {filteredResources.map((resource) => (
              <article className="resource-row" key={resource.path}>
                <div className="resource-icon">
                  <FileArchive size={21} aria-hidden="true" />
                </div>
                <div className="resource-main">
                  <div>
                    <span>{resource.category}</span>
                    <span>{resource.format}</span>
                    <span>{resource.visibility}</span>
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <small>{resource.path}</small>
                </div>
                <OpenResourceButton href={resourceHref(resource.path)} />
              </article>
            ))}
          </div>
        ) : (
          <EmptyState description="请调整资料分类或搜索关键词。" />
        )}
      </section>

      <section className="panel internal-note-panel">
        <FolderOpen size={21} aria-hidden="true" />
        <div>
          <strong>内部资料提醒</strong>
          <p>
            问卷原始数据、个人姓名、编号、通讯录和内部明细仅限授权范围内查看，不应对外发送。
          </p>
        </div>
      </section>
    </div>
  );
}
