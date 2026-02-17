import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ThemeDefinition } from "@/types";

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.ttf",
      fontWeight: 700,
    },
  ],
});

interface SlideData {
  title: string;
  content: string;
  layout: string;
  generatedImageUrl?: string;
}

function createStyles(theme: ThemeDefinition) {
  return StyleSheet.create({
    page: {
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
      backgroundColor: theme.colors.background,
      fontFamily: "Inter",
      padding: 60,
      justifyContent: "center",
    },
    title: {
      fontSize: 36,
      fontWeight: 700,
      color: theme.colors.foreground,
      marginBottom: 24,
    },
    content: {
      fontSize: 18,
      color: theme.colors.foreground,
      opacity: 0.85,
      lineHeight: 1.6,
    },
    splitContainer: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
    },
    splitText: {
      flex: 1,
      paddingRight: 40,
    },
    splitImage: {
      width: SLIDE_WIDTH * 0.4,
      height: SLIDE_HEIGHT - 120,
      borderRadius: 12,
    },
    fullImagePage: {
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
      position: "relative",
    },
    fullImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    fullImageOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 60,
      paddingTop: 80,
    },
    fullImageTitle: {
      fontSize: 36,
      fontWeight: 700,
      color: "#FFFFFF",
      marginBottom: 12,
    },
    fullImageContent: {
      fontSize: 18,
      color: "#FFFFFF",
      opacity: 0.9,
      lineHeight: 1.6,
    },
    slideNumber: {
      position: "absolute",
      bottom: 20,
      right: 30,
      fontSize: 12,
      color: theme.colors.primary,
      opacity: 0.6,
    },
    accentBar: {
      width: 60,
      height: 4,
      backgroundColor: theme.colors.primary,
      marginBottom: 20,
      borderRadius: 2,
    },
  });
}

function parseContent(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      if (line.startsWith("# ") || line.startsWith("## ")) return "";
      if (line.startsWith("- ")) return `  \u2022  ${line.slice(2)}`;
      if (/^\d+\.\s/.test(line)) return `  ${line}`;
      return line;
    })
    .filter((line) => line !== "")
    .join("\n");
}

function TextOnlySlide({
  slide,
  theme,
  index,
}: {
  slide: SlideData;
  theme: ThemeDefinition;
  index: number;
}) {
  const styles = createStyles(theme);
  return (
    <Page size={[SLIDE_WIDTH, SLIDE_HEIGHT]} style={styles.page}>
      <View style={styles.accentBar} />
      <Text style={styles.title}>{slide.title}</Text>
      <Text style={styles.content}>{parseContent(slide.content)}</Text>
      <Text style={styles.slideNumber}>{index + 1}</Text>
    </Page>
  );
}

function TextImageSlide({
  slide,
  theme,
  index,
}: {
  slide: SlideData;
  theme: ThemeDefinition;
  index: number;
}) {
  const styles = createStyles(theme);
  return (
    <Page size={[SLIDE_WIDTH, SLIDE_HEIGHT]} style={styles.page}>
      <View style={styles.splitContainer}>
        <View style={styles.splitText}>
          <View style={styles.accentBar} />
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.content}>{parseContent(slide.content)}</Text>
        </View>
        {slide.generatedImageUrl && (
          <Image src={slide.generatedImageUrl} style={styles.splitImage} />
        )}
      </View>
      <Text style={styles.slideNumber}>{index + 1}</Text>
    </Page>
  );
}

function ImageFullSlide({
  slide,
  theme,
  index,
}: {
  slide: SlideData;
  theme: ThemeDefinition;
  index: number;
}) {
  const styles = createStyles(theme);
  return (
    <Page size={[SLIDE_WIDTH, SLIDE_HEIGHT]} style={{ padding: 0 }}>
      <View style={styles.fullImagePage}>
        {slide.generatedImageUrl && (
          <Image src={slide.generatedImageUrl} style={styles.fullImage} />
        )}
        <View style={styles.fullImageOverlay}>
          <Text style={styles.fullImageTitle}>{slide.title}</Text>
          <Text style={styles.fullImageContent}>
            {parseContent(slide.content)}
          </Text>
        </View>
        <Text style={styles.slideNumber}>{index + 1}</Text>
      </View>
    </Page>
  );
}

export function PresentationDocument({
  slides,
  theme,
}: {
  slides: SlideData[];
  theme: ThemeDefinition;
}) {
  return (
    <Document>
      {slides.map((slide, index) => {
        const key = `slide-${index}`;
        switch (slide.layout) {
          case "text-image":
            return (
              <TextImageSlide
                key={key}
                slide={slide}
                theme={theme}
                index={index}
              />
            );
          case "image-full":
            return (
              <ImageFullSlide
                key={key}
                slide={slide}
                theme={theme}
                index={index}
              />
            );
          default:
            return (
              <TextOnlySlide
                key={key}
                slide={slide}
                theme={theme}
                index={index}
              />
            );
        }
      })}
    </Document>
  );
}
