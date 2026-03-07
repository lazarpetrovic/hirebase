import AnalyticsCardsSection from "./AnalyticsCardsSection";

export default function AnalyticsView() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Your application stats compared to last week.</p>
            <AnalyticsCardsSection />
        </div>
    );
}
