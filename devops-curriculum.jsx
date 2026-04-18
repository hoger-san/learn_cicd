import { useState } from "react";

const COLORS = {
  bg: "#0a0e17",
  surface: "#111827",
  surfaceHover: "#1a2235",
  border: "#1e293b",
  accent: "#22d3ee",
  accentDim: "#0e7490",
  warn: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
  text: "#e2e8f0",
  textDim: "#94a3b8",
  textMuted: "#64748b",
  day1: "#6366f1",
  day1Dim: "#4338ca",
  day2: "#ec4899",
  day2Dim: "#be185d",
};

const phases = [
  {
    day: 1,
    title: "Day 1 — 基盤構築：Git → CI → 自動デプロイ",
    goal: "個人ブログをGitHub Pages に自動公開するパイプラインを構築する",
    icon: "🏗️",
    concepts: ["① SLCP自動化 (CI/CD)", "② 構成管理"],
    sessions: [
      {
        time: "午前 (3h)",
        title: "Session 1: Gitと構成管理の基礎",
        color: COLORS.day1,
        steps: [
          {
            label: "環境構築",
            detail: "Git / GitHub アカウント / VS Code をセットアップ",
            tool: "Git, GitHub",
            concept: "②構成管理",
          },
          {
            label: "Gitワークフロー体験",
            detail:
              "init → add → commit → push の一連の流れを実際に手を動かして覚える。branch / merge でチーム開発の疑似体験",
            tool: "Git CLI",
            concept: "②構成管理",
          },
          {
            label: "静的サイト作成",
            detail:
              "Hugo または手書きHTML/CSS で簡単な自己紹介ブログを作成。package.json や config で依存関係を明示する",
            tool: "Hugo / HTML",
            concept: "②構成管理",
          },
        ],
      },
      {
        time: "午後前半 (2h)",
        title: "Session 2: GitHub Actions で CI パイプライン構築",
        color: COLORS.day1,
        steps: [
          {
            label: "YAMLでワークフロー定義",
            detail:
              ".github/workflows/ci.yml を作成。push をトリガーにビルド＆テストを自動実行する",
            tool: "GitHub Actions",
            concept: "①CI",
            code: `name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build site
        run: hugo --minify
      - name: HTML validate
        run: npx html-validate public/`,
          },
          {
            label: "テスト自動化",
            detail:
              "HTMLバリデーション、リンク切れチェックをCIに組み込み「壊れたコードは統合させない」を体感",
            tool: "html-validate, lychee",
            concept: "①CI",
          },
          {
            label: "失敗体験",
            detail:
              "意図的にエラーを含むコードをpushし、CIが検出→修正→再push→グリーンの流れを経験",
            tool: "GitHub Actions",
            concept: "①CI",
          },
        ],
      },
      {
        time: "午後後半 (2h)",
        title: "Session 3: CD — GitHub Pages 自動デプロイ",
        color: COLORS.accent,
        steps: [
          {
            label: "デプロイジョブ追加",
            detail:
              "CIが通ったら自動で GitHub Pages にデプロイするジョブを追加。CD（継続的デプロイ）の完成",
            tool: "GitHub Pages",
            concept: "①CD",
            code: `  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/deploy-pages@v4`,
          },
          {
            label: "動作確認＆振り返り",
            detail:
              "コードを変更→push→自動ビルド→自動テスト→自動公開の一連の流れを確認。SLCPのどの工程が自動化されたか整理",
            tool: "ブラウザ",
            concept: "①SLCP自動化",
          },
        ],
      },
    ],
    deliverable: "✅ pushするだけでブログが自動公開される CI/CD パイプライン",
  },
  {
    day: 2,
    title: "Day 2 — 発展：IaC + セキュリティ + 実運用",
    goal: "Docker + セキュリティスキャンを組み込んだ本格パイプラインに進化させる",
    icon: "🔒",
    concepts: ["② IaC", "③ DevSecOps"],
    sessions: [
      {
        time: "午前 (3h)",
        title: "Session 4: Docker で IaC 体験",
        color: COLORS.day2,
        steps: [
          {
            label: "Dockerfile 作成",
            detail:
              "ブログをコンテナ化。「環境をコードで定義する」IaCの基本思想を体感する",
            tool: "Docker",
            concept: "②IaC",
            code: `FROM nginx:alpine
COPY public/ /usr/share/nginx/html/
EXPOSE 80`,
          },
          {
            label: "ローカルで動作確認",
            detail:
              "docker build → docker run でローカル確認。「誰の環境でも同じ結果」を実証",
            tool: "Docker CLI",
            concept: "②IaC",
          },
          {
            label: "docker-compose で構成管理",
            detail:
              "複数サービス構成を compose.yml で宣言的に管理。設定ファイルがそのままドキュメントになることを体験",
            tool: "Docker Compose",
            concept: "②構成管理",
          },
        ],
      },
      {
        time: "午後前半 (2h)",
        title: "Session 5: DevSecOps — セキュリティの自動化",
        color: COLORS.danger,
        steps: [
          {
            label: "依存関係の脆弱性スキャン",
            detail:
              "npm audit / Trivy をCIに組み込み、既知の脆弱性を自動検出。シフトレフトの実践",
            tool: "Trivy, npm audit",
            concept: "③シフトレフト",
            code: `  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Trivy scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'HIGH,CRITICAL'`,
          },
          {
            label: "コンテナイメージスキャン",
            detail:
              "ビルドしたDockerイメージに対してTrivyでスキャン。サプライチェーン攻撃の入口を塞ぐ",
            tool: "Trivy",
            concept: "③サプライチェーン保護",
          },
          {
            label: "シークレット管理",
            detail:
              "APIキーなどの秘密情報をコードにハードコードせず GitHub Secrets で管理する方法を学ぶ",
            tool: "GitHub Secrets",
            concept: "③DevSecOps",
          },
        ],
      },
      {
        time: "午後後半 (2h)",
        title: "Session 6: 統合＆実運用パイプライン完成",
        color: COLORS.success,
        steps: [
          {
            label: "フルパイプライン構築",
            detail:
              "Build → Test → Security Scan → Deploy の4ステージパイプラインを完成させる",
            tool: "GitHub Actions",
            concept: "①②③統合",
          },
          {
            label: "ブランチ保護ルール設定",
            detail:
              "mainブランチへの直pushを禁止し、PR + CIパス必須のルールを設定。チーム開発のベストプラクティス",
            tool: "GitHub Settings",
            concept: "②構成管理",
          },
          {
            label: "振り返り＆ロードマップ",
            detail:
              "2日間で構築したパイプラインを図解で整理。次のステップ（Terraform, K8s, 監視）への道筋を確認",
            tool: "Mermaid / 手書き",
            concept: "全体俯瞰",
          },
        ],
      },
    ],
    deliverable:
      "✅ セキュリティスキャン付きの本格 CI/CD パイプライン + 公開ブログ",
  },
];

const conceptMap = {
  "①CI": { color: "#6366f1", icon: "🔄" },
  "①CD": { color: "#8b5cf6", icon: "🚀" },
  "①SLCP自動化": { color: "#a78bfa", icon: "♻️" },
  "②構成管理": { color: "#22d3ee", icon: "📋" },
  "②IaC": { color: "#06b6d4", icon: "📝" },
  "③シフトレフト": { color: "#f59e0b", icon: "⬅️" },
  "③サプライチェーン保護": { color: "#ef4444", icon: "🛡️" },
  "③DevSecOps": { color: "#f97316", icon: "🔐" },
  "①②③統合": { color: "#10b981", icon: "⚡" },
  "全体俯瞰": { color: "#94a3b8", icon: "🗺️" },
};

function ConceptBadge({ concept }) {
  const info = conceptMap[concept] || { color: "#94a3b8", icon: "📌" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        background: info.color + "18",
        color: info.color,
        border: `1px solid ${info.color}33`,
        letterSpacing: 0.3,
      }}
    >
      {info.icon} {concept}
    </span>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position: "relative", marginTop: 8 }}>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          background: copied ? COLORS.success + "33" : COLORS.border,
          color: copied ? COLORS.success : COLORS.textDim,
          border: "none",
          borderRadius: 4,
          padding: "2px 8px",
          fontSize: 11,
          cursor: "pointer",
        }}
      >
        {copied ? "✓" : "Copy"}
      </button>
      <pre
        style={{
          background: "#060a12",
          border: `1px solid ${COLORS.border}`,
          borderRadius: 6,
          padding: "12px 14px",
          fontSize: 12,
          lineHeight: 1.5,
          color: COLORS.accent,
          overflowX: "auto",
          margin: 0,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
      >
        {code}
      </pre>
    </div>
  );
}

function StepCard({ step, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 8,
        padding: "12px 14px",
        marginBottom: 8,
        cursor: "pointer",
        transition: "border-color 0.2s",
      }}
      onClick={() => setOpen(!open)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <span
          style={{
            background: COLORS.accentDim + "44",
            color: COLORS.accent,
            borderRadius: "50%",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            flexShrink: 0,
            marginTop: 1,
          }}
        >
          {index + 1}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                color: COLORS.text,
                fontSize: 14,
              }}
            >
              {step.label}
            </span>
            <ConceptBadge concept={step.concept} />
          </div>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 13,
              color: COLORS.textDim,
              lineHeight: 1.55,
            }}
          >
            {step.detail}
          </p>
          {step.tool && (
            <div
              style={{
                marginTop: 6,
                fontSize: 11,
                color: COLORS.textMuted,
              }}
            >
              🛠 {step.tool}
            </div>
          )}
          {open && step.code && <CodeBlock code={step.code} />}
          {step.code && (
            <div
              style={{
                marginTop: 4,
                fontSize: 11,
                color: COLORS.accent,
                opacity: 0.7,
              }}
            >
              {open ? "▲ コードを閉じる" : "▼ サンプルコードを見る"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SessionBlock({ session }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            background: session.color,
            width: 4,
            height: 28,
            borderRadius: 2,
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontSize: 11,
              color: COLORS.textMuted,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {session.time}
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            {session.title}
          </div>
        </div>
      </div>
      {session.steps.map((step, i) => (
        <StepCard key={i} step={step} index={i} />
      ))}
    </div>
  );
}

function PipelineDiagram() {
  const stages = [
    { label: "Code", icon: "💻", color: COLORS.day1 },
    { label: "Build", icon: "🔨", color: COLORS.day1 },
    { label: "Test", icon: "🧪", color: COLORS.accent },
    { label: "Scan", icon: "🛡️", color: COLORS.warn },
    { label: "Deploy", icon: "🚀", color: COLORS.success },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        margin: "16px 0",
        flexWrap: "wrap",
      }}
    >
      {stages.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              background: s.color + "22",
              border: `1.5px solid ${s.color}55`,
              borderRadius: 8,
              padding: "8px 14px",
              textAlign: "center",
              minWidth: 56,
            }}
          >
            <div style={{ fontSize: 18 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: s.color,
                marginTop: 2,
              }}
            >
              {s.label}
            </div>
          </div>
          {i < stages.length - 1 && (
            <span
              style={{
                color: COLORS.textMuted,
                fontSize: 16,
                margin: "0 4px",
              }}
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function DevOpsCurriculum() {
  const [activeDay, setActiveDay] = useState(0);
  const phase = phases[activeDay];

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        color: COLORS.text,
        fontFamily:
          "'IBM Plex Sans', 'Noto Sans JP', -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
        {/* Header */}
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: COLORS.accent,
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Project-Based Learning
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.3,
              background: `linear-gradient(135deg, ${COLORS.day1}, ${COLORS.accent}, ${COLORS.day2})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DevOps / CI/CD 2日間集中
          </h1>
          <p
            style={{
              fontSize: 13,
              color: COLORS.textDim,
              marginTop: 6,
            }}
          >
            pushするだけでブログが公開される世界を、ゼロから構築する
          </p>
        </div>

        {/* Final Pipeline */}
        <PipelineDiagram />

        {/* Day Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          {phases.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: 8,
                border: `1.5px solid ${
                  activeDay === i
                    ? i === 0
                      ? COLORS.day1
                      : COLORS.day2
                    : COLORS.border
                }`,
                background:
                  activeDay === i
                    ? (i === 0 ? COLORS.day1 : COLORS.day2) + "18"
                    : COLORS.surface,
                color: activeDay === i ? COLORS.text : COLORS.textMuted,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: activeDay === i ? 700 : 500,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 18, display: "block" }}>{p.icon}</span>
              Day {p.day}
            </button>
          ))}
        </div>

        {/* Day Content */}
        <div
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <h2
            style={{
              fontSize: 17,
              fontWeight: 800,
              margin: "0 0 4px",
              color: COLORS.text,
            }}
          >
            {phase.title}
          </h2>
          <p
            style={{
              fontSize: 13,
              color: COLORS.textDim,
              margin: "0 0 10px",
            }}
          >
            🎯 {phase.goal}
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {phase.concepts.map((c, i) => (
              <ConceptBadge key={i} concept={c} />
            ))}
          </div>
        </div>

        {/* Sessions */}
        {phase.sessions.map((session, i) => (
          <SessionBlock key={i} session={session} />
        ))}

        {/* Deliverable */}
        <div
          style={{
            background: COLORS.success + "11",
            border: `1px solid ${COLORS.success}33`,
            borderRadius: 8,
            padding: 14,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: COLORS.success,
            }}
          >
            成果物
          </div>
          <div style={{ fontSize: 13, color: COLORS.text, marginTop: 4 }}>
            {phase.deliverable}
          </div>
        </div>

        {/* Concept Legend */}
        <div
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: 14,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: COLORS.textMuted,
              marginBottom: 8,
              letterSpacing: 0.5,
            }}
          >
            概念マッピング
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {Object.keys(conceptMap).map((key) => (
              <ConceptBadge key={key} concept={key} />
            ))}
          </div>
          <p
            style={{
              fontSize: 11,
              color: COLORS.textMuted,
              marginTop: 10,
              lineHeight: 1.5,
            }}
          >
            各ステップに対応する概念をバッジで表示しています。
            タップでサンプルコードも確認できます。
          </p>
        </div>
      </div>
    </div>
  );
}
