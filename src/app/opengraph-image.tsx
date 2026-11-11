import { ImageResponse } from 'next/og';

export const alt = 'Ziyad Fouda - Interactive AI Engineer Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OgImage() {
  const stackTags = [
    'LangGraph',
    'LangChain',
    'Azure AI Foundry',
    'RAG Systems',
    'PyTorch',
    'FastAPI',
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFA',
          padding: '48px 56px',
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#000000',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            backgroundColor: '#FFFFFF',
            border: '4px solid #000000',
            borderRadius: '28px',
            padding: '44px 48px',
            boxShadow: '10px 10px 0px #000000',
          }}
        >
          {/* Top Status Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderBottom: '3px solid #000000',
              paddingBottom: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '9999px',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  fontSize: '20px',
                  fontWeight: 900,
                  border: '2px solid #ED1C24',
                }}
              >
                ZF
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#000000',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Ziyad Fouda
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#555555',
                  }}
                >
                  AI Engineer • Mansoura, Egypt
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#ED1C24',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                INTERACTIVE AI PORTFOLIO
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#F5F5F5',
                  border: '2px solid #000000',
                  color: '#00AA44',
                  fontSize: '14px',
                  fontWeight: 800,
                }}
              >
                ● Available for AI Roles
              </div>
            </div>
          </div>

          {/* Center Hero Title & Stack Badges */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '12px',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: '54px',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#000000',
              }}
            >
              <span>Building Agentic AI &</span>
              <span style={{ color: '#ED1C24' }}>Production LLM Systems.</span>
            </div>

            <div
              style={{
                fontSize: '21px',
                fontWeight: 600,
                color: '#333333',
                lineHeight: 1.4,
              }}
            >
              CS Senior @ Mansoura University (GPA 3.7 • High Honors) - 4 AI Internships across
              GenAI, Multi-Agent RAG, and MLOps.
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '4px',
              }}
            >
              {stackTags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 18px',
                    backgroundColor: '#DCDCDC',
                    border: '2px solid #000000',
                    borderRadius: '9999px',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#000000',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Floating Chat Bar Preview */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: '#F5F5F5',
              border: '3px solid #000000',
              borderRadius: '9999px',
              padding: '12px 16px 12px 24px',
            }}
          >
            <span
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#555555',
              }}
            >
              Ask Ziyad anything about his AI projects, internships, or stack...
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                backgroundColor: '#ED1C24',
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 900,
              }}
            >
              →
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
