import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CircleAlert,
} from "lucide-react";

export function PageHeader({ title, description, meta, action }) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        {meta ? (
          <div className="page-meta">
            <CalendarDays size={16} aria-hidden="true" />
            <span>{meta}</span>
          </div>
        ) : null}
      </div>
      {action}
    </header>
  );
}

export function SectionHeader({ title, description, action }) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ icon: Icon, value, suffix, label, note, tone = "blue" }) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <div className="stat-icon" aria-hidden="true">
        <Icon size={25} strokeWidth={1.8} />
      </div>
      <div>
        <div className="stat-value">
          {value}
          {suffix ? <small>{suffix}</small> : null}
        </div>
        <div className="stat-label">{label}</div>
        {note ? <div className="stat-note">{note}</div> : null}
      </div>
    </article>
  );
}

export function RiskTag({ risk }) {
  const normalized = risk || "待定";
  return <span className={`tag risk-${normalized}`}>{normalized}风险</span>;
}

export function PriorityTag({ priority }) {
  return <span className={`tag priority-${priority}`}>优先级：{priority}</span>;
}

export function StatusTag({ status }) {
  return <span className="tag status-tag">{status}</span>;
}

export function TextLink({ children, onClick, href }) {
  const content = (
    <>
      {children}
      <ChevronRight size={15} aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <a className="text-link" href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className="text-link" type="button" onClick={onClick}>
      {content}
    </button>
  );
}

export function EmptyState({ title = "没有匹配结果", description }) {
  return (
    <div className="empty-state">
      <CircleAlert size={28} aria-hidden="true" />
      <strong>{title}</strong>
      <span>{description}</span>
    </div>
  );
}

export function OpenResourceButton({ href }) {
  return (
    <a className="button button-secondary" href={href} target="_blank" rel="noreferrer">
      打开资料
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
