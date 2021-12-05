import React from "react";
import { useAuth } from "context/auth-context";
import { FullPageErrorFallback } from "components/lib";
import { ErrorBoundary } from "components/error-boundary";
import { AuthenticatedApp } from "screens/authenticated-app";
import { UnauthenticatedApp } from "screens/unauthenticated-app";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
