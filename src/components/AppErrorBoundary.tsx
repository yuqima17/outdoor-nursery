import { Component, type ErrorInfo, type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  errorMessage?: string;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {};

  static getDerivedStateFromError(error: unknown): AppErrorBoundaryState {
    return {
      errorMessage: error instanceof Error ? error.message : "The app hit an unexpected error."
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Outdoor Nursery runtime error", error, errorInfo.componentStack);
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Outdoor Nursery hit a startup problem</Text>
          <Text style={styles.body}>
            Please send this message to outdoornursery@gmail.com so we can help.
          </Text>
          <Text selectable style={styles.errorText}>
            {this.state.errorMessage}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 24
  },
  title: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 32
  },
  body: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    marginTop: 12
  },
  errorText: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.coral,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
    marginTop: 18,
    padding: 14
  }
});
