import { Configurator, AnnotationCommand, SwitchTextTypeCommand } from 'substance'
import NumberedLabelGenerator from './NumberedLabelGenerator'

export default class TextureConfigurator extends Configurator {

  addAnnotationTool(spec) {
    this.addCommand(spec.name, AnnotationCommand, {
      nodeType: spec.nodeType,
      commandGroup: spec.commandGroup,
    })
    this.addIcon(spec.name, { 'fontawesome': spec.icon })
    this.addLabel(spec.name, spec.label)
    if (spec.accelerator) {
      this.addKeyboardShortcut(spec.accelerator, { command: spec.name })
    }
  }

  addTextTypeTool(spec) {
    this.addCommand(spec.name, SwitchTextTypeCommand, {
      spec: spec.nodeSpec,
      commandGroup: 'text-types'
    })
    this.addIcon(spec.name, { 'fontawesome': spec.icon })
    this.addLabel(spec.name, spec.label)
    if (spec.accelerator) {
      this.addKeyboardShortcut(spec.accelerator, { command: spec.name })
    }

  }

  setPanelsSpec(panelsSpec) {
    this.config.panelsSpec = panelsSpec
  }

  getPanelsSpec() {
    return this.config.panelsSpec
  }

  // see NumberedLabelGenerator
  setLabelGenerator(type, spec) {
    if (!this.config.labelGenerator) {
      this.config.labelGenerator = {}
    }
    this.config.labelGenerator[type] = spec
  }

  getLabelGenerator(type) {
    let config
    if (this.config.labelGenerator) {
      config = this.config.labelGenerator[type] || {}
    }
    return new NumberedLabelGenerator(config)
  }

}
