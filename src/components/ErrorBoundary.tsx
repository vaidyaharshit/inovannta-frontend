import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('INNOVANTA Uncaught Runtime Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = window.location.origin + window.location.pathname;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08080c] text-white flex items-center justify-center p-4 font-sans selection:bg-purple-600/30">
          <div className="w-full max-w-lg bg-[#11121d] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
            {/* Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-5 relative z-10">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 relative z-10">
              Something went wrong
            </h1>
            <p className="text-sm text-slate-400 mb-6 relative z-10">
              An unexpected error occurred while rendering the page. You can reload or return to the homepage.
            </p>

            {this.state.error && (
              <div className="mb-6 text-left p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-rose-300 overflow-x-auto max-h-36">
                <p className="font-semibold mb-1">{this.state.error.name}: {this.state.error.message}</p>
                {this.state.errorInfo?.componentStack && (
                  <pre className="text-[11px] text-slate-400 whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 relative z-10">
              <button
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white text-sm font-semibold shadow-lg cursor-pointer transition-all active:scale-98"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/10 cursor-pointer transition-all active:scale-98"
              >
                <Home className="w-4 h-4" />
                <span>Go to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
