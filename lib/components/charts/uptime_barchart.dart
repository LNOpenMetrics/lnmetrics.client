import 'package:client/model/node_metric_one.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class UpTimeBarChart extends StatefulWidget {
  final String aliasNode;
  final PeerUpTimeRating rating;

  const UpTimeBarChart(
      {Key? key, required this.aliasNode, required this.rating})
      : super(key: key);

  @override
  State<StatefulWidget> createState() => UpTimeBarChartState();
}

class UpTimeBarChartState extends State<UpTimeBarChart> {
  final Duration animDuration = const Duration(milliseconds: 250);
  int touchedIndex = -1;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 500,
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
        color: Theme.of(context).colorScheme.onPrimary,
        child: Stack(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisAlignment: MainAxisAlignment.start,
                mainAxisSize: MainAxisSize.max,
                children: <Widget>[
                  Text(widget.aliasNode,
                      style: Theme.of(context).textTheme.headline6),
                  const SizedBox(
                    height: 4,
                  ),
                  Text('Up Time Rating',
                      style: Theme.of(context).textTheme.bodyText1!),
                  const SizedBox(
                    height: 38,
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8.0),
                      child: BarChart(
                        _mainBarData(),
                        swapAnimationDuration: animDuration,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 12,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  BarChartGroupData _makeGroupData(
    int x,
    double y, {
    bool isTouched = false,
    double width = 22,
    List<int> showTooltips = const [],
  }) {
    return BarChartGroupData(
      x: x,
      barRods: [
        BarChartRodData(
          y: isTouched ? y + 1 : y,
          colors: [Theme.of(context).colorScheme.primary],
          width: width,
          borderSide: BorderSide(
              color: Theme.of(context).colorScheme.primary, width: 1),
          backDrawRodData: BackgroundBarChartRodData(
            show: true,
            y: 100,
            colors: [Theme.of(context).highlightColor],
          ),
        ),
      ],
      showingTooltipIndicators: showTooltips,
    );
  }

  List<BarChartGroupData> showingGroups() => List.generate(4, (i) {
        switch (i) {
          case 0:
            return _makeGroupData(0, widget.rating.today.toDouble(),
                isTouched: i == touchedIndex);
          case 1:
            return _makeGroupData(1, widget.rating.tenDays.toDouble(),
                isTouched: i == touchedIndex);
          case 2:
            return _makeGroupData(2, widget.rating.thirtyDays.toDouble(),
                isTouched: i == touchedIndex);
          case 3:
            return _makeGroupData(3, widget.rating.sixMonths.toDouble(),
                isTouched: i == touchedIndex);
          default:
            return throw Error();
        }
      });

  BarChartData _mainBarData() {
    return BarChartData(
      barTouchData: BarTouchData(
        touchTooltipData: BarTouchTooltipData(
            tooltipBgColor: Colors.blueGrey,
            getTooltipItem: (group, groupIndex, rod, rodIndex) {
              String weekDay;
              switch (group.x.toInt()) {
                case 0:
                  weekDay = 'Today';
                  break;
                case 1:
                  weekDay = 'Last 10 Days';
                  break;
                case 2:
                  weekDay = 'Last 30 Days';
                  break;
                case 3:
                  weekDay = 'Last 6 Months';
                  break;
                default:
                  throw Error();
              }
              return BarTooltipItem(
                weekDay + '\n',
                const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
                children: <TextSpan>[
                  TextSpan(
                    text: (rod.y - 1).toString(),
                    style: const TextStyle(
                      color: Colors.yellow,
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              );
            }),
        touchCallback: (FlTouchEvent event, barTouchResponse) {
          setState(() {
            if (!event.isInterestedForInteractions ||
                barTouchResponse == null ||
                barTouchResponse.spot == null) {
              touchedIndex = -1;
              return;
            }
            touchedIndex = barTouchResponse.spot!.touchedBarGroupIndex;
          });
        },
      ),
      titlesData: FlTitlesData(
        show: true,
        rightTitles: SideTitles(showTitles: false),
        topTitles: SideTitles(showTitles: false),
        bottomTitles: SideTitles(
          showTitles: true,
          getTextStyles: (context, value) => const TextStyle(
              color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
          margin: 16,
          getTitles: (double value) {
            switch (value.toInt()) {
              case 0:
                return 'Today';
              case 1:
                return '10 Days';
              case 2:
                return '30 Days';
              case 3:
                return '6 Months';
              default:
                return '';
            }
          },
        ),
        leftTitles: SideTitles(
          showTitles: false,
        ),
      ),
      borderData: FlBorderData(
        show: false,
      ),
      barGroups: showingGroups(),
      gridData: FlGridData(show: false),
    );
  }

  Future<dynamic> refreshState() async {
    setState(() {});
    await Future<dynamic>.delayed(
        animDuration + const Duration(milliseconds: 50));
  }
}
