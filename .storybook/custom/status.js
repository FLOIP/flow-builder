export const statuses = {
  status: {
    statuses: {
      beta: {
        background: "#38a9f0",
        color: "#ffffff",
        description:
          "This component is in beta and is not ready to be deployed",
      },
      experimental: {
        background: "#ffff00",
        color: "#2c2f33",
        description: "Just an experiment",
      },
      exampleOnly: {
        background: "#ff9933",
        color: "#2c2f33",
        description: "Just an example should not be used as a component",
      },
      readyToBeTested: {
        background: "#ffff00",
        color: "#2c2f33",
        description: "Need Design/QA team review",
      },
      stable: {
        background: "#15c534",
        color: "#ffffff",
        description: "This component is stable",
      },
      deprecated: {
        background: "#ff0000",
        color: "#ffffff",
        description: "This component is deprecated",
      },
      underDevelopment: {
        background: "#7167ce",
        color: "#ffffff",
        description: "This component is under development",
      },
    },
  }
}

export default statuses