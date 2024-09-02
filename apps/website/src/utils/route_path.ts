export default class RoutePath {
  static docs() {
    if (process.env['NEXT_PUBLIC_DOCS_URL']) {
      return process.env['NEXT_PUBLIC_DOCS_URL'];
    }
    return 'https://docs.palico.ai';
  }

  static docsInstallation() {
    return `${RoutePath.docs()}/getting_started/installation`;
  }

  static docsConcepts() {
    return `${RoutePath.docs()}/getting_started/concepts`;
  }

  static docsWorkflow() {
    return `${RoutePath.docs()}/build_app/workflows`;
  }

  static docsTracing() {
    return `${RoutePath.docs()}/build_app/tracing`;
  }

  static docsClientSDK() {
    return `${RoutePath.docs()}/build_app/sdk`;
  }

  static docsExperimentation() {
    return `${RoutePath.docs()}/build_app/experiments/intro`;
  }

  static docsStudios() {
    return `${RoutePath.docs()}/build_app/studio`;
  }

  static docsEvaluation() {
    return `${RoutePath.docs()}/build_app/experiments/intro#evaluation`;
  }

  static docsExperimentAnalysis() {
    return `${RoutePath.docs()}/build_app/experiments/intro#step-3-run-an-evaluation`;
  }

  static docsVersioning() {
    return `${RoutePath.docs()}/getting_started/concepts#version-control`;
  }

  static cookbook() {
    return `${RoutePath.docs()}/cookbooks`;
  }

  static docsChatbot() {
    return `${RoutePath.cookbook()}/building_a_chatbot_with_memory`;
  }

  static docsBuildARagApp() {
    return `${RoutePath.cookbook()}/building_a_rag_application`;
  }

  static docsAiTextEditor() {
    return `${RoutePath.cookbook()}/building_ai_text_editor`;
  }

  static docsClassifyDocuments() {
    return `${RoutePath.cookbook()}/classify_news_articles`;
  }

  static docsConvertTextToSQL() {
    return `${RoutePath.cookbook()}/text_to_sql`;
  }

  static docsUnstructuredToJSON() {
    return `${RoutePath.cookbook()}/unstructured_to_json`;
  }

  static quickStart() {
    return RoutePath.docsInstallation();
  }

  static github() {
    return 'https://github.com/palico-ai/palico-ai';
  }

  static scheduleDemo() {
    return 'https://calendar.app.google/3rsaXFkGFNBXniZGA';
  }

  static newsletter() {
    return 'https://forms.gle/HX3Dn4TYu3o1anoP6';
  }
}
