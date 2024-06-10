import { Card } from "@ui-kitten/components";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CustomListHeader from "../components/ui/CustomListHeader";
import CustomBackButton from "../components/ui/CustomBackButton";

const ExploreRosary = () => {
  const steps = [
    "While holding the crucifix, make the Sign of the Cross and say the Apostles’ Creed.",
    "On the first bead and all the single beads, say an Our Father.",
    "Pray one Hail Mary on each of the next three beads for an increase in faith, hope, and charity.",
    "On the next single bead, pray the Glory Be.",
    "Before praying the next set of ten beads (called a decade), first meditate on the first mystery. Announce the mystery, imagine the event, and begin to meditate on it by itself or in association with whatever matter the mystery brings to your heart.",
    "Pray an Our Father.",
    "Pray a Hail Mary on the first bead of the decade, and on each following bead.",
    "After praying the decade, pray the Glory Be. You may also want to add the Fatima invocation.",
    "Reflect on the second mystery, then pray an Our Father on the next single bead.",
    "Pray the Hail Mary on the next ten beads. Repeat the sequence around the rosary.",
    "At the end of the last decade, pray the Hail Holy Queen.",
  ];
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text variant="headlineSmall" style={styles.textStyle}>
          Rosary
        </Text>

        <Card>
          <Text variant="headlineSmall" style={{ textAlign: "center" }}>
            How to Pray the Rosary
          </Text>
        </Card>

        <View style={{ marginBottom: 20, marginTop: 20 }}>
          <Card>
            <CustomListHeader title={"Praying the Rosary"} />
            {steps.map((data, index) => (
              <Text style={styles.caption} key={index}>{`${
                index + 1
              }. ${data}`}</Text>
            ))}
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="The Sign of the Cross" />
            <Text style={styles.caption}>
              In the name of the Father, And of the Son, And of the Holy Spirit.
              Amen.
            </Text>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="The Apostles’ Creed" />
            <Text style={styles.caption}>
              I believe in God, the Father almighty, Creator of heaven and
              earth. and in Jesus Christ, his only Son, our Lord, who was
              conceived by the Holy Spirit, born of the Virgin Mary, suffered
              under Pontius Pilate, was crucified, died, and was buried; he
              descended into hell; on the third day he rose again from the dead;
              he ascended into heaven, and is seated at the right hand of God
              the Father almighty; from there he will come to judge the living
              and the dead. I believe in the Holy Spirit, the holy catholic
              Church, the communion of saints, the forgiveness of sins, the
              resurrection of the body, and life everlasting. Amen.
            </Text>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="The Lord’s Prayer (Our Father)" />
            <Text style={styles.caption}>
              Our Father, who art in heaven, hallowed be thy name; thy kingdom
              come; thy will be done on earth as it is in heaven. Give us this
              day our daily bread; and forgive us our trespasses as we forgive
              those who trespass against us; and lead us not into temptation,
              but deliver us from evil. Amen.
            </Text>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="Hail Mary" />
            <Text style={styles.caption}>
              Hail Mary, full of grace. The Lord is with thee. Blessed art thou
              among women, and blessed is the fruit of thy womb, Jesus. Holy
              Mary, Mother of God, pray for us sinners, now and at the hour of
              our death. Amen.
            </Text>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="The Glory Be (The Doxology)" />
            <Text style={styles.caption}>
              Glory be to the Father, and to the Son, and to the Holy Spirit. As
              it was in the beginning, is now, and ever shall be, world without
              end. Amen.
            </Text>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="Fatima Invocation" />
            <Text style={styles.caption}>
              O my Jesus, forgive us our sins, save us from the fires of hell,
              and lead all souls to heaven, especially those most in need of thy
              mercy.
            </Text>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="Hail, Holy Queen (Salve Regina)" />
            <Text style={styles.caption}>
              Hail, holy Queen, Mother of Mercy. Hail, our life, our sweetness,
              and our hope. To you do we cry, poor banished children of Eve. To
              you do we send up our sighs, mourning and weeping in this valley
              of tears. Turn, then most gracious advocate, your eyes of mercy
              toward us and after this, our exile, show unto us the blessed
              fruit of your womb, Jesus. O clement, O loving, O sweet Virgin
              Mary.
            </Text>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="The Joyful Mysteries" />
            <Text variant="labelLarge">(Mondays and Saturdays)</Text>
            <Text style={styles.caption}>
              1. The Annunciation of the birth of the Lord to Mary by the
              archangel Gabriel (Lk 1:26-38).
            </Text>
            <Text style={styles.caption}>
              2. The Visitation of Our Lady with St. Elizabeth, the mother of
              St. John the Baptist (Lk 1:39-56).
            </Text>
            <Text style={styles.caption}>
              3. The Nativity of Our Lord (Mt 1:18-25; Lk 2:1-20).
            </Text>
            <Text style={styles.caption}>
              4. The Presentation of the Christ Child in the Temple (Lk
              2:22-32).
            </Text>
            <Text style={styles.caption}>
              5. The Finding of the Child Jesus in the Temple (Lk 2:41-52).
            </Text>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="The Sorrowful Mysteries" />
            <Text variant="labelLarge">(Tuesdays and Fridays) </Text>
            <Text style={styles.caption}>
              1. The Agony in the Garden of Gethsemane (Mk 14:32-42).
            </Text>
            <Text style={styles.caption}>
              2. The Scourging of Jesus (Jn 19:1).
            </Text>
            <Text style={styles.caption}>
              3. The Crowning with Thorns (Mk 15:16-20).
            </Text>
            <Text style={styles.caption}>
              4. The Carrying of the Cross (Jn 19:12-17).
            </Text>
            <Text style={styles.caption}>
              5. The Crucifixion (Mt 27:33-56; Mk 15:22-41; Lk 23:26-49; Jn
              19:16-30)
            </Text>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="The Luminous Mysteries" />
            <Text variant="labelLarge">(Thursdays) </Text>
            <Text style={styles.caption}>
              1. The Baptism of Our Lord in the River Jordan (Mt 3:13-16)
            </Text>
            <Text style={styles.caption}>
              2. The Self-Manifestation of Our Lord at the Wedding at Cana (Jn
              2:1-11).
            </Text>
            <Text style={styles.caption}>
              3. The Proclamation of the Kingdom of God (Mk 1:14-15).
            </Text>
            <Text style={styles.caption}>
              4. The Transfiguration of Our Lord (Mt 17:1-8; Lk 9:28-29).
            </Text>
            <Text style={styles.caption}>
              5. The Last Supper, when the Eucharist was Instituted (Mt 26).
            </Text>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card>
            <CustomListHeader title="The Glorious Mysteries" />
            <Text variant="labelLarge">(Wednesdays and Sundays) </Text>
            <Text style={styles.caption}>
              1. The Resurrection (Lk 24:1-12; Jn 20).
            </Text>
            <Text style={styles.caption}>
              2. The Ascension (Lk 24:50-53; Acts 1:1-12).
            </Text>
            <Text style={styles.caption}>
              3. The Descent of the Holy Spirit at Pentecost (Acts 2:1-4).
            </Text>
            <Text style={styles.caption}>
              4. The Assumption of the Blessed Virgin Mary (Song 2:8-14).
            </Text>
            <Text style={styles.caption}>
              5. The Coronation of the Blessed Mother (Rev 12:1-4).
            </Text>
          </Card>
        </View>
        <CustomBackButton route={"ExplorePage"} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 10,
    fontFamily: "Montserrat-Bold",
    color: "black",
    textAlign: "left",
    paddingVertical: 10,
  },
  caption: {
    textAlign: "justify",
  },
});

export default ExploreRosary;
