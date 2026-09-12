<div align="center">

# TDK Landscape

### Kubernetes-free local development for distributed systems.

Build the service, not the setup. TDK gives teams one manifest-driven workflow for starting the databases, queues, APIs, and frontends that make up a real local stack.

[Explore TDK CLI](https://tdk-landscape.github.io/tdk-website/) · [Read the documentation](https://tdk-landscape.github.io/tdk-website/docs/) · [Start with an example](https://github.com/tdk-landscape/tdk-example)

</div>

## Local Development Without Cluster Tax

TDK CLI runs multi-service applications locally with Docker and Tilt. Define a service once, keep the generated development wiring consistent, and bring up the part of the landscape you need.

```sh
tdk init
tdk up
```

The result is a repeatable developer environment that does not require Kubernetes knowledge or a remote cluster to begin productive work.

## Explore The Landscape

| Project | Purpose |
| --- | --- |
| [TDK Example](https://github.com/tdk-landscape/tdk-example) | A reference service stack that demonstrates the TDK workflow end to end. |
| [TDK User Management](https://github.com/tdk-landscape/tdk-user-management) | An identity-focused example landscape with SCIM 2.0 and OAuth 2.0 PKCE. |
| [TDK Website](https://github.com/tdk-landscape/tdk-website) | Documentation, guides, and examples for working with TDK. |

## Start Here

New to TDK? Begin with the [Quickstart](https://tdk-landscape.github.io/tdk-website/docs/quickstart/), then use the [examples](https://tdk-landscape.github.io/tdk-website/docs/examples/) to see complete stacks in practice.

Have a project that belongs in this landscape? Open an issue or pull request in the repository closest to the work.
