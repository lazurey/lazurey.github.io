# UI Unit Test

### Why we do this?

- Ensure functions are executed correctly
- Ensure every data is rendered correctly (functionally, not visually)

## Tech stack

- [] Typescript
- [] React
- [] Redux
- [] Jest
- [] Enzyme -['en.zaɪm]-
- [] Express -for server side rendering-

## What to test

### All pure functions

- Utilities: TDD
- Stateless helpers: TDD
- Reducers (Redux)
- Stateless actions (redux)

### Logic part of UI components

- User interaction
- Data rendering

## What not to test in unit test

- UI layout & styling

```javascript
  <div style={{ background: '#fff' }}>
    <ul>
      {props.links.map((link, index) => (
        <li key={index}>
          <a href={link.path}>{link.text}</a>
        </li>)
      )}
    </ul>
  </div>
```

## Tricky things

- API calls: tested by middleare AsyncActionMiddleware
- Async actions
- Server side rendering

### Scenario
API provide doesn't change
API consumer accidentally makes a change to the request (path or parameter)
How & Who to detect this error and fail the build.

**Possible solution**
1. Typescript ensures every API call's parameter have a specific interface, which can ensure the key and types of value are as expected.
1. Use mock server in gw-www, and follow the schema from swagger (gw-bedrock), and in the unit test, we could test every API call is legal in the mock server.
