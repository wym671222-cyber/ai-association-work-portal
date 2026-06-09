import { useState } from "react";
import {
  Bell,
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Route,
  ShieldCheck,
  X,
} from "lucide-react";
import AnnualPlanPage from "./components/AnnualPlanPage";
import OverviewPage from "./components/OverviewPage";
import ProjectsPage from "./components/ProjectsPage";
import ResourcesPage from "./components/ResourcesPage";
import SafetyPage from "./components/SafetyPage";
import TrainingPage from "./components/TrainingPage";
import { portalMeta } from "./data/portalData";

const navigation = [
  { id: "overview", label: "工作总览", icon: LayoutDashboard },
  { id: "annual", label: "推进节奏", icon: Route },
  { id: "projects", label: "探索台账", icon: ClipboardList },
  { id: "training", label: "薪火计划", icon: GraduationCap },
  { id: "resources", label: "资料中心", icon: BookOpen },
  { id: "safety", label: "安全合规", icon: ShieldCheck },
];

const pageComponents = {
  overview: OverviewPage,
  annual: AnnualPlanPage,
  projects: ProjectsPage,
  training: TrainingPage,
  resources: ResourcesPage,
  safety: SafetyPage,
};

export default function App() {
  const [activePage, setActivePage] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const ActivePage = pageComponents[activePage];

  function navigate(pageId) {
    setActivePage(pageId);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "open" : ""}`}>
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            AI
          </div>
          <div>
            <strong>AI协会工作门户</strong>
            <span>竹网行动</span>
          </div>
          <button
            className="mobile-nav-close"
            type="button"
            aria-label="关闭导航"
            onClick={() => setMobileNavOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <nav aria-label="主导航">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={activePage === item.id ? "active" : ""}
                type="button"
                key={item.id}
                onClick={() => navigate(item.id)}
              >
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <strong>{portalMeta.company}</strong>
          <span>{portalMeta.period}</span>
          <span>版本状态：{portalMeta.versionStatus}</span>
        </div>
      </aside>

      <div className="app-main">
        <div className="topbar">
          <button
            className="mobile-menu-button"
            type="button"
            aria-label="打开导航"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu size={21} />
          </button>
          <div className="topbar-title">
            <span>{navigation.find((item) => item.id === activePage)?.label}</span>
            <small>{portalMeta.phase}</small>
          </div>
          <div className="topbar-actions">
            <button type="button" aria-label="通知">
              <Bell size={19} />
            </button>
            <div className="user-block">
              <div>协</div>
              <span>
              <strong>协会秘书组</strong>
              <small>工作台</small>
              </span>
            </div>
          </div>
        </div>
        <main>
          <ActivePage onNavigate={navigate} />
        </main>
      </div>
      {mobileNavOpen ? (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="关闭导航"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}
    </div>
  );
}
