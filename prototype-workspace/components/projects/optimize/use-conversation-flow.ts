import { useState, useEffect, RefObject } from "react";
import { useTypewriter } from "../../shared/use-typewriter";
import {
  RECOMMENDATION_TEXT,
  DEPLOYMENT_PLAN_TEXT,
  DEPLOYMENT_PROGRESS_TEXT,
  DEPLOYMENT_COMPLETE_TEXT,
} from "./conversation-data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ConversationFlowState {
  // Visibility states
  showCopilotResponse: boolean;
  showCards: boolean;
  showOptimizationRecs: boolean;
  showRecsActions: boolean;
  showRec2Execution: boolean;
  showRec2ExecActions: boolean;
  showRec2Success: boolean;
  showDeploymentPlan: boolean;
  showDeploymentPlanCard: boolean;
  showDeploymentPlanFeedback: boolean;
  showDeploymentProgress: boolean;
  showDeploymentProgressCard: boolean;
  showDeploymentProgressFeedback: boolean;
  showDeploymentComplete: boolean;
  showLastReadDivider: boolean;
  showDeploymentCompleteCard: boolean;
  showDeploymentCompleteFeedback: boolean;
  showProjectCard: boolean;

  // Setters the UI still needs directly
  setShowOptimizationRecs: (v: boolean) => void;
  setShowRecsActions: (v: boolean) => void;
  setShowRec2Execution: (v: boolean) => void;
  setShowRec2ExecActions: (v: boolean) => void;
  setShowRec2Success: (v: boolean) => void;
  setShowProjectCard: (v: boolean) => void;

  // Handlers
  handleDeployContainerApp: () => void;
  handleApproveAndDeploy: () => void;
  handleDeploymentComplete: () => void;

  // Typewriter outputs consumed by the JSX
  recommendationTypedText: string;
  isRecommendationDone: boolean;
  deploymentTypedText: string;
  isDeploymentDone: boolean;
  deploymentProgressTypedText: string;
  isDeploymentProgressDone: boolean;
  deploymentCompleteTypedText: string;
  isDeploymentCompleteDone: boolean;
}

interface UseConversationFlowOptions {
  chatAreaRef: RefObject<HTMLDivElement | null>;
  useTopNav: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function scrollToBottom(ref: RefObject<HTMLDivElement | null>) {
  if (ref.current) {
    ref.current.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }
}

function scrollToElement(
  ref: RefObject<HTMLDivElement | null>,
  selector: string,
) {
  if (!ref.current) return;
  const el = document.querySelector(selector) as HTMLElement | null;
  if (el) {
    ref.current.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/** Manages the linear conversation-flow state machine for OptimizationAgent. */
export function useConversationFlow({
  chatAreaRef,
  useTopNav,
}: UseConversationFlowOptions): ConversationFlowState {
  // -- Boolean visibility states --------------------------------------------
  const [showCopilotResponse, setShowCopilotResponse] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showOptimizationRecs, setShowOptimizationRecs] = useState(false);
  const [showRecsActions, setShowRecsActions] = useState(false);
  const [showRec2Execution, setShowRec2Execution] = useState(false);
  const [showRec2ExecActions, setShowRec2ExecActions] = useState(false);
  const [showRec2Success, setShowRec2Success] = useState(false);
  const [showDeploymentPlan, setShowDeploymentPlan] = useState(false);
  const [showDeploymentPlanCard, setShowDeploymentPlanCard] = useState(false);
  const [showDeploymentPlanFeedback, setShowDeploymentPlanFeedback] =
    useState(false);
  const [showDeploymentProgress, setShowDeploymentProgress] = useState(false);
  const [showDeploymentProgressCard, setShowDeploymentProgressCard] =
    useState(false);
  const [showDeploymentProgressFeedback, setShowDeploymentProgressFeedback] =
    useState(false);
  const [showDeploymentComplete, setShowDeploymentComplete] = useState(false);
  const [showLastReadDivider, setShowLastReadDivider] = useState(false);
  const [showDeploymentCompleteCard, setShowDeploymentCompleteCard] =
    useState(false);
  const [showDeploymentCompleteFeedback, setShowDeploymentCompleteFeedback] =
    useState(false);
  const [showProjectCard, setShowProjectCard] = useState(false);

  // -- Typewriter effects ---------------------------------------------------

  const {
    typedText: recommendationTypedText,
    isComplete: isRecommendationDone,
  } = useTypewriter({
    text: RECOMMENDATION_TEXT,
    enabled: showCopilotResponse && useTopNav,
    scrollRef: chatAreaRef,
    onComplete: () => {
      setTimeout(() => {
        setShowCards(true);
        setTimeout(() => scrollToBottom(chatAreaRef), 100);
      }, 200);
    },
  });

  const { typedText: deploymentTypedText, isComplete: isDeploymentDone } =
    useTypewriter({
      text: DEPLOYMENT_PLAN_TEXT,
      enabled: showDeploymentPlan,
      onComplete: () => {
        setTimeout(() => {
          setShowDeploymentPlanCard(true);
          setTimeout(() => scrollToBottom(chatAreaRef), 100);
        }, 200);
      },
    });

  const {
    typedText: deploymentProgressTypedText,
    isComplete: isDeploymentProgressDone,
  } = useTypewriter({
    text: DEPLOYMENT_PROGRESS_TEXT,
    enabled: showDeploymentProgress,
    onComplete: () => {
      setTimeout(() => {
        setShowDeploymentProgressCard(true);
        setTimeout(() => scrollToBottom(chatAreaRef), 100);
      }, 200);
    },
  });

  const {
    typedText: deploymentCompleteTypedText,
    isComplete: isDeploymentCompleteDone,
  } = useTypewriter({
    text: DEPLOYMENT_COMPLETE_TEXT,
    enabled: showDeploymentComplete,
    onComplete: () => {
      setTimeout(() => {
        setShowDeploymentCompleteCard(true);
        setTimeout(() => scrollToBottom(chatAreaRef), 100);
      }, 200);
    },
  });

  // -- Timing cascades (useEffect) ------------------------------------------

  // Initial load: scroll to bottom then reveal copilot response after 800ms
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
    setTimeout(() => {
      setShowCopilotResponse(true);
      setTimeout(() => scrollToBottom(chatAreaRef), 100);
    }, 800);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // After cards animate in, scroll (showFeedback was dead — removed)
  useEffect(() => {
    if (!showCards) return;
    const timer = setTimeout(() => {
      scrollToBottom(chatAreaRef);
    }, 900);
    return () => clearTimeout(timer);
  }, [showCards]); // eslint-disable-line react-hooks/exhaustive-deps

  // Feedback after deployment plan card
  useEffect(() => {
    if (!showDeploymentPlanCard) return;
    const timer = setTimeout(() => {
      setShowDeploymentPlanFeedback(true);
      setTimeout(() => scrollToBottom(chatAreaRef), 100);
    }, 500);
    return () => clearTimeout(timer);
  }, [showDeploymentPlanCard]); // eslint-disable-line react-hooks/exhaustive-deps

  // Feedback after deployment progress card
  useEffect(() => {
    if (!showDeploymentProgressCard) return;
    const timer = setTimeout(() => {
      setShowDeploymentProgressFeedback(true);
      setTimeout(() => scrollToBottom(chatAreaRef), 100);
    }, 500);
    return () => clearTimeout(timer);
  }, [showDeploymentProgressCard]); // eslint-disable-line react-hooks/exhaustive-deps

  // Feedback after deployment complete card
  useEffect(() => {
    if (!showDeploymentCompleteCard) return;
    const timer = setTimeout(() => {
      setShowDeploymentCompleteFeedback(true);
      setTimeout(() => scrollToBottom(chatAreaRef), 100);
    }, 500);
    return () => clearTimeout(timer);
  }, [showDeploymentCompleteCard]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll + "Last read" divider when deployment complete starts
  useEffect(() => {
    if (!showDeploymentComplete) return;
    setShowLastReadDivider(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToBottom(chatAreaRef);
        setTimeout(() => {
          scrollToElement(
            chatAreaRef,
            '[data-message="deployment-complete"]',
          );
        }, 900);
      }, 100);
    });
  }, [showDeploymentComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  // -- Handlers -------------------------------------------------------------

  const handleDeployContainerApp = () => {
    setShowDeploymentPlan(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToElement(
          chatAreaRef,
          '[data-message="deploy-container-app"]',
        );
      }, 50);
    });
  };

  const handleApproveAndDeploy = () => {
    setShowDeploymentProgress(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToElement(chatAreaRef, '[data-message="approve-deploy"]');
      }, 50);
    });
  };

  const handleDeploymentComplete = () => {
    setShowDeploymentComplete(true);
  };

  // -- Return ---------------------------------------------------------------

  return {
    showCopilotResponse,
    showCards,
    showOptimizationRecs,
    showRecsActions,
    showRec2Execution,
    showRec2ExecActions,
    showRec2Success,
    showDeploymentPlan,
    showDeploymentPlanCard,
    showDeploymentPlanFeedback,
    showDeploymentProgress,
    showDeploymentProgressCard,
    showDeploymentProgressFeedback,
    showDeploymentComplete,
    showLastReadDivider,
    showDeploymentCompleteCard,
    showDeploymentCompleteFeedback,
    showProjectCard,

    setShowOptimizationRecs,
    setShowRecsActions,
    setShowRec2Execution,
    setShowRec2ExecActions,
    setShowRec2Success,
    setShowProjectCard,

    handleDeployContainerApp,
    handleApproveAndDeploy,
    handleDeploymentComplete,

    recommendationTypedText,
    isRecommendationDone,
    deploymentTypedText,
    isDeploymentDone,
    deploymentProgressTypedText,
    isDeploymentProgressDone,
    deploymentCompleteTypedText,
    isDeploymentCompleteDone,
  };
}
