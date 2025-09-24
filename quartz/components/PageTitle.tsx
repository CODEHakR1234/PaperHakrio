// @ts-nocheck
import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const githubUrl = "https://github.com/CODEHakR1234"
  return (
    <div class={classNames(displayClass, "page-title-block")}>
      <h2 class="page-title">
        <a href={baseDir}>{title}</a>
      </h2>
      <div class="page-title-sub">
        <a href={githubUrl} target="_blank" rel="me noopener noreferrer">
          @CODEHakR1234
        </a>
      </div>
    </div>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title-sub {
  margin-top: 0.25rem;
  font-size: 0.95rem;
}

.page-title-sub a {
  color: var(--secondary);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
